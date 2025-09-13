import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Loan } from '../models/loan';
import { Repayments } from '../models/repayments';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(private http: HttpClient ) { }
  bankUrl = 'http://localhost:4000/api';

  getLoans():Observable<Loan[]>{
    return this.http.get<Loan[]>(`${this.bankUrl}/loans/myLoans`)
  }
  apply(payload:{loanType:string,amount:number,tenureMonths:number,interestRate:number}):Observable<Loan>{
    return this.http.post<Loan>(`${this.bankUrl}/loans/apply`,payload)
  }
  getRepaymentSchedule(id:string):Observable<Repayments[]>{
    return this.http.get<Repayments[]>(`${this.bankUrl}/loans/${id}/repayments`)
  }
  getLoanDetails(id:string):Observable<Loan>{
    return this.http.get<Loan>(`${this.bankUrl}/loans/${id}`)
  }
  monthlyPayment(id:string,payload:{amount:number}){
    return this.http.post(`${this.bankUrl}/loans/${id}/pay`,payload)
  }
  updateLoanStatus(id:string,payload:{status:string}){
      return this.http.patch(`${this.bankUrl}/loans/${id}/status`,payload)
  }
  getAllLoans():Observable<Loan[]>{
    return this.http.get<Loan[]>(`${this.bankUrl}/loans/admin/allLoans`)
  }
}
