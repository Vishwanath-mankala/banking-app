import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';
import { AuthserviceService } from '../../services/authservice.service'; // adjust path

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet, RouterModule, NgIf,AsyncPipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  token: string | null = null;

  constructor(private router: Router, public auth: AuthserviceService) {
    this.token = localStorage.getItem('token');

  }

  logout() {
    this.auth.logout();
    this.token = null;
    this.router.navigate(['/login']);
  }
}
