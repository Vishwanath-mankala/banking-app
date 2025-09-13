import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthserviceService {
  userurl = 'http://localhost:4000/graphql';
  _id!: string;
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}  

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token && !this.jwtHelper.isTokenExpired(token);
  }
  logout() {
    localStorage.removeItem('token');
  }

  getUserId(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = this.jwtHelper.decodeToken(token);
      return decoded?.userId || null;
    }
    return null;
  }

  getUsers(){
    const body ={
      query: `
      query{
      users{
      id
      name
      email
      role
      }
      }
      `
    };
    return this.http.post<{ data: { users: any[] } }>(this.userurl, body);
  }
  getUser(id: string) {
    const body = {
      query: `
        query ($id: ID!) {
          user(id: $id) {
            id
            name
            email
            role
          }
        }
      `,
      variables: {
        id: id
      }
    };
  
    return this.http.post<any>(this.userurl, body);
  }
  

  signup(name: string, email: string, password: string) {
    const body = {
      query: `
      mutation($input: CreateUserInput!) {
        createUser(input: $input) {
          name
          email
        }
      }
    `,
      variables: {
        input: { name, email, password },
      },
    };

    return this.http.post<any>(this.userurl, body);
  }

  login(email: string, password: string) {
    const body = {
      query: `
      mutation($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          token
          user {
            id
            name
            email
          }
        }
      }`,
      variables: {
        email,
        password,
      },
    };
    return this.http.post<any>(this.userurl, body);
  }

  getToken() {
    return localStorage.getItem('token');
  }
}

//   signup(name: string, email: string, password: string) {
//     const input = {
//       name,
//       email,
//       password,
//     };
//     const signup_mutation = gql`
//     mutation($input: CreateUserInput!){
//       createUser(input: ${input}) {
//         name
//         email
//       }
//     }
//     `;
//     return this.http.post<any>(this.userurl,{query : signup_mutation});
//   }
// }
