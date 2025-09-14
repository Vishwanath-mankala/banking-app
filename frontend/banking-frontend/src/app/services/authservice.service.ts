// src/app/services/authservice.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthserviceService {
  userurl = 'http://localhost:4000/graphql';

  // 👇 1. Declare the property here without initializing it.
  private loggedIn: BehaviorSubject<boolean>;

  // Expose the state as a public Observable.
  public isLoggedIn$: BehaviorSubject<boolean>;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    // 👇 2. Initialize it inside the constructor, now that jwtHelper is available.
    this.loggedIn = new BehaviorSubject<boolean>(this.isLoggedIn());
    this.isLoggedIn$ = this.loggedIn; // Assign the public observable
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token && !this.jwtHelper.isTokenExpired(token);
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
  }

  getUserId(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = this.jwtHelper.decodeToken(token);
      return decoded?.userId || null;
    }
    return null;
  }

  login(email: string, password: string) {
    const body = {
      query: `
      mutation($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          token
          user { id name email }
        }
      }`,
      variables: { email, password },
    };

    return this.http.post<any>(this.userurl, body).pipe(
      tap(response => {
        if (response?.data?.login?.token) {
          const token = response.data.login.token;
          localStorage.setItem('token', token);
          this.loggedIn.next(true);
        }
      })
    );
  }

  getUsers(){
    const body ={
      query: `
      query{
        users{ id name email role }
      }`
    };
    return this.http.post<{ data: { users: any[] } }>(this.userurl, body);
  }
  
  getUser(id: string) {
    const body = {
      query: `
        query ($id: ID!) {
          user(id: $id) { id name email role }
        }`,
      variables: { id: id }
    };
    return this.http.post<any>(this.userurl, body);
  }

  signup(name: string, email: string, password: string) {
    const body = {
      query: `
      mutation($input: CreateUserInput!) {
        createUser(input: $input) { name email }
      }`,
      variables: {
        input: { name, email, password },
      },
    };
    return this.http.post<any>(this.userurl, body);
  }

  getToken() {
    return localStorage.getItem('token');
  }
}