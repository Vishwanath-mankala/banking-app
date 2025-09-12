import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { Account } from '../../models/account';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transaction',
  imports: [FormsModule, CommonModule],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css',
})
export class TransactionComponent {
  accounts!: (Account)[];
  transactionMessage: string = '';


  constructor(private accountService: AccountService) {
    this.accountService.getAccounts().subscribe({
      next: (res) => {
        this.accounts = res;
        console.log('Accounts fetched: ', this.accounts);
      },
      error: (err) => {
        console.log(`Error : ${err}`);
      },
    });
  }

  deposit(accountId: string, amount: number) {
    this.accountService.deposit(accountId, { amount }).subscribe({
      next: (res) => {
        console.log('Deposit successful:', res);
         if (res.message) {
        this.transactionMessage = 'Deposit was successful!';
      }
        this.refreshAccounts();
      },
      error: (err) => console.error('Deposit error:', err),
    });
  }

  withdraw(accountId: string, amount: number) {
    this.accountService.withdraw(accountId, { amount }).subscribe({
      next: (res) => {
        console.log('Withdraw successful:', res);
        this.refreshAccounts();
      },
      error: (err) => console.error('Withdraw error:', err),
    });
  }

  transfer(fromAccountId: string, toAccountId: string, amount: number) {
    this.accountService
      .transfer({
        fromAccountId: fromAccountId,
        toAccountId: toAccountId,
        amount,
      })
      .subscribe({
        next: (res) => {
          console.log('Transfer successful:', res);
          this.refreshAccounts();
        },
        error: (err) => console.error('Transfer error:', err),
      });
  }

  private refreshAccounts() {
    this.accountService.getAccounts().subscribe({
      next: (res) => (this.accounts = res),
      error: (err) => console.error('Error refreshing accounts:', err),
    });
  }
}
