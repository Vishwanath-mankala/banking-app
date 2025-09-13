import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoanService } from '../../services/loan.service';
import { Loan } from '../../models/loan';
import { AuthserviceService } from '../../services/authservice.service';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent implements OnInit {
  loans: Loan[] = [];
  groupedLoans: { [userId: string]: Loan[] } = {};
  selectedStatus: { [loanId: string]: string } = {};
  statusOptions = ['pending', 'approved', 'rejected', 'active', 'closed'];
  isLoading = true;
  stats = {
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    active: 0,
    closed: 0
  };

  constructor(
    private loanService: LoanService,
    private authService: AuthserviceService
  ) {}

  ngOnInit() {
    this.loadAllLoans();
  }

  loadAllLoans() {
    this.isLoading = true;
    this.loanService.getAllLoans().subscribe({
      next: (res) => {
        console.log('Loans fetched successfully:', res);
        this.loans = res;
        this.groupLoansByUserId();
        this.calculateStats();
        this.isLoading = false;
      },
      error: (err) => {
        console.log('Error occurred while fetching all Loans:', err);
        this.isLoading = false;
      }
    });
  }

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

  calculateStats() {
    this.stats = {
      total: this.loans.length,
      pending: this.loans.filter(loan => loan.status === 'pending').length,
      approved: this.loans.filter(loan => loan.status === 'approved').length,
      rejected: this.loans.filter(loan => loan.status === 'rejected').length,
      active: this.loans.filter(loan => loan.status === 'active').length,
      closed: this.loans.filter(loan => loan.status === 'closed').length
    };
  }

  getUserIds(): string[] {
    return Object.keys(this.groupedLoans);
  }

  getLoansForUser(userId: string): Loan[] {
    return this.groupedLoans[userId] || [];
  }

  updateStatus(loanId: string, newStatus: string) {
    this.loanService.updateLoanStatus(loanId, { status: newStatus }).subscribe({
      next: (res) => {
        console.log('Loan Status Updated', res);
        this.loadAllLoans(); // Refresh data
      },
      error: (err) => {
        console.log('Error while changing status:', err);
      }
    });
  }

  onStatusChange(loanId: string, newStatus: string) {
    this.selectedStatus[loanId] = newStatus;
    this.updateStatus(loanId, newStatus);
  }

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

  refreshData() {
    this.loadAllLoans();
  }

  // Helper methods for template
  getPendingLoansForUser(userId: string): number {
    return this.getLoansForUser(userId).filter(l => l.status === 'pending').length;
  }

  getApprovedLoansForUser(userId: string): number {
    return this.getLoansForUser(userId).filter(l => l.status === 'approved').length;
  }

  getActiveLoansForUser(userId: string): number {
    return this.getLoansForUser(userId).filter(l => l.status === 'active').length;
  }

  hasPendingLoans(userId: string): boolean {
    return this.getPendingLoansForUser(userId) > 0;
  }

  hasApprovedLoans(userId: string): boolean {
    return this.getApprovedLoansForUser(userId) > 0;
  }

  hasActiveLoans(userId: string): boolean {
    return this.getActiveLoansForUser(userId) > 0;
  }
}
