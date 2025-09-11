import { Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: 'signup', component: SignupComponent }, 
    { path: 'login', component: LoginComponent }, 
    { path: 'home', component: HomeComponent }, 
    { path: 'create-account', component: CreateAccountComponent, canActivate: [authGuard] }, 
];
