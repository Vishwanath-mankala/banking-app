import { Component } from '@angular/core';
import { AuthserviceService } from '../../services/authservice.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email!: string;
  password!: string;
  token!: string;

  constructor(
    private authService: AuthserviceService,
    private router: Router
  ) {}

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        this.token = response.data.login.token;
        localStorage.setItem('token', this.token);
        console.log('Login successful:', response);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Login failed:', error);
      },
    });
  }
}
