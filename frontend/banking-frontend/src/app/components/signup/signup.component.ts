import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthserviceService } from '../../services/authservice.service';
import { Router } from '@angular/router';

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

  constructor(private authService:AuthserviceService,
    private router:Router
  ){
  }

  onSubmit(){
    this.authService.signup(this.name,this.email,this.password).subscribe(
      {
        next: (res)=>{
          this.authService.login(this.email,this.password).subscribe(
            {
              next:(res)=>{
                this.router.navigate(['/home']);
              },
              error:(err)=>{
                this.router.navigate(['/login'])
              }
            }
          )
          
          console.log(res);
        },
        error:(err)=>{
          console.log(err)
        },

      }
    )
  }

}
