import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouterStore } from '@ngrx/router-store';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { JWTInterceptor } from './interceptors/jwt.interceptor';
import { JwtModule, JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

export function tokenGetter() {
  return localStorage.getItem('token');
}
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(),
    provideEffects(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideRouterStore(),
  provideHttpClient(withInterceptors([JWTInterceptor])),
    {
      provide: JWT_OPTIONS,
      useValue: {
        tokenGetter,
        allowedDomains: ['localhost:4000'], // add your backend URL
        disallowedRoutes: ['http://localhost:4000/graphql/login'],
      },
    },
    JwtHelperService,
  ],
};
