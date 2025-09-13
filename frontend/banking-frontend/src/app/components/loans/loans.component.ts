import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { AuthserviceService } from '../../services/authservice.service';
import { Loan } from '../../models/loan';
import { LoanService } from '../../services/loan.service';
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-loans',
  standalone: true,
  imports: [CommonModule, NgClass, FormsModule],
  templateUrl: './loans.component.html',
  styleUrl: './loans.component.css'
})
export class LoansComponent  {
  user!: string;
  loans!:Loan[];
  groupedLoans: { [userId: string]: Loan[] } = {};
  loanType!:string;
  amount!:number;
  tenureMonths!:number;
  interestRate!:number;
  id!:string|null;
  selectedStatus: { [loanId: string]: string } = {};
  statusOptions = ['pending', 'approved', 'rejected', 'active', 'closed'];
  constructor(public loanService:LoanService,
    public auth:AuthserviceService
  ){
     this.id = this.auth.getUserId();
    if (this.id) {
      this.auth.getUser(this.id).subscribe({
        next: (res) => {
          this.user = res.data.user;
          console.log(this.user);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
    this.loanService.getLoans().subscribe({
      next: (res) => {
        this.loans = res;
        this.groupLoansByUserId();
        console.log(this.loans);
      },
    });
  }

  applyForLoan(payload:{loanType:string,amount:number,tenureMonths:number,interestRate:number}){
    this.loanService.apply(payload).subscribe({
      next: (res) => {
        console.log(res);
        this.refreshLoans()
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  makeMonthlyPayment(loan_id:string,amount:number){
    this.loanService.monthlyPayment(loan_id,{amount:1}).subscribe({
      next:(res)=>{
        console.log("Repayment Success")
      },
      error:(err)=>{
        console.log(`Error while payment:`,err)
      }
    })
  }
  refreshLoans(){
    this.loanService.getLoans().subscribe({
      next :(res)=>{
        this.loans = res;
        this.groupLoansByUserId();
        console.log("Successfully refreshed loans")
      },
      error:(err)=>{
        console.log(`Error while fetching loans`,err)
      }
    })
  }

  // Group loans by userId
  groupLoansByUserId() {
    this.groupedLoans = {};
    this.loans.forEach(loan => {
      const userId = loan.userId;
      if (!this.groupedLoans[userId]) {
        this.groupedLoans[userId] = [];
      }
      this.groupedLoans[userId].push(loan);
    });
  }

  // Get user IDs for iteration
  getUserIds(): string[] {
    return Object.keys(this.groupedLoans);
  }

  // Get loans for a specific user
  getLoansForUser(userId: string): Loan[] {
    return this.groupedLoans[userId] || [];
  }

  // Update loan status
  updateLoanStatus(loanId: string, newStatus: string) {
    this.loanService.updateLoanStatus(loanId, {status: newStatus}).subscribe({
      next: (res) => {
        console.log('Loan status updated successfully');
        this.refreshLoans();
      },
      error: (err) => {
        console.log('Error updating loan status:', err);
      }
    });
  }

  // Handle status change
  onStatusChange(loanId: string, newStatus: string) {
    this.selectedStatus[loanId] = newStatus;
    this.updateLoanStatus(loanId, newStatus);
  }

  // Get status badge class
  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'approved':
        return 'status-approved';
      case 'pending':
        return 'status-pending';
      case 'rejected':
        return 'status-rejected';
      case 'active':
        return 'status-active';
      case 'closed':
        return 'status-closed';
      default:
        return 'status-pending';
    }
  }

  // Get status dot class
  getStatusDotClass(status: string): string {
    switch (status) {
      case 'approved':
        return 'status-dot-approved';
      case 'pending':
        return 'status-dot-pending';
      case 'rejected':
        return 'status-dot-rejected';
      case 'active':
        return 'status-dot-active';
      case 'closed':
        return 'status-dot-closed';
      default:
        return 'status-dot-pending';
    }
  }
}
