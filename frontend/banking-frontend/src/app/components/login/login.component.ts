import { Component } from '@angular/core';
import { AuthserviceService } from '../../services/authservice.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email!: string;
  password!: string;
  token!:string;

  constructor(private authService: AuthserviceService) {}

  onSubmit() {
    this.authService.login(this.email,this.password).subscribe({
      next:(response)=>{
        this.token = response.data.login.token;
        console.log('Login successful:', response);
      },
      error:(error)=>{
        console.error('Login failed:', error);
      }
    })
  }
}
