  import { HttpClient } from '@angular/common/http';
  import { Injectable } from '@angular/core';
import { Account } from '../account';
import { Observable } from 'rxjs';

  @Injectable({
    providedIn: 'root',
  })
  export class AccountService {
    constructor(private http: HttpClient) {}

    bankUrl = 'http://localhost:4000/api'

    createAccount(accountType:{type:string}){
      return this.http.post(`${this.bankUrl}/accounts`,accountType)
    }

    getAccounts():Observable<Account[]>{
      return this.http.get<Account[]>(`${this.bankUrl}/accounts`)
    }

    deposit(id:string, amount:{amount:number}){
      return this.http.post(`${this.bankUrl}/accounts/${id}/deposit`,amount)
    }

    withdraw(id:string, amount:{amount:number}){
      return this.http.post(`${this.bankUrl}/accounts/${id}/withdraw`,amount)
    }

    transfer(payload:{fromAccountId:string,toAccountId:string,amount: number}){
      return this.http.post(`${this.bankUrl}/accounts/transfer`,payload)
    }

  }
