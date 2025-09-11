import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthserviceService } from '../../services/authservice.service';

@Component({
  selector: 'app-signup',
  imports: [FormsModule,CommonModule],
  templateUrl: './signup.component.html',
  styles: ``
})
export class SignupComponent {
  name!:string;
  email!:string;
  password!:string;

  constructor(private authService:AuthserviceService){
  }

  onSubmit(){
    this.authService.signup(this.name,this.email,this.password).subscribe(
      {
        next: (res)=>{
          console.log(res);
        },
        error:(err)=>{
          console.log(err)
        },

      }
    )
  }

}
