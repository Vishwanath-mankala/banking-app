import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthserviceService {
  userurl = 'http://localhost:4000/graphql';
  constructor(private http: HttpClient) {}

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
       email, password ,
      },
    };
    return this.http.post<any>(this.userurl, body);
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
