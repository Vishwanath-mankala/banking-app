import { Component } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-account',
  imports: [FormsModule,CommonModule],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css'
})
export class CreateAccountComponent {
  accountType!:string;
  constructor(private accountService: AccountService){}

  onSubmit(){
    this.accountService.createAccount({type : this.accountType}).subscribe({
      next:(response)=>{
        console.log('Account created successfully:',response);
      },
      error:(err)=>{
        console.error('Account creation failed:',err);
      }
    })
  }
}
