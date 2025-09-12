import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { AccountService } from '../../services/account.service';
import { Account } from '../../account';

@Component({
  selector: 'app-transaction',
  imports: [FormsModule],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})
export class TransactionComponent {
  deposit_amount!:number;
  withdraw_amount!:number;
  accounts!:Account[];
  constructor(private accountService: AccountService){
   this.accountService.getAccounts().subscribe({
           next : (res) =>{
              this.accounts = res
              console.log("Accounts fetched: " , this.accounts)
          },
          error : (err)=>{
            console.log(`Error : ${err}`)
          }
        })
  }

  deposit(deposit_amount:number){
      this.accountService.deposit("68c2b3516361381e0d32e0ba",{amount:this.deposit_amount}).subscribe({
        next : (res) =>{
          console.log("Deposit successful: " , {res})
        },
        error : (err) =>{
          console.log(`Error : ${err}`)
        }
      })
  }

  withdraw(){
    
  }




}
