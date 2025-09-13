import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthserviceService } from '../../services/authservice.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  user!: any;
  users: any[] = [];   // ✅ make it a real array
  totalUsers: number = 0; // ✅ initialize with 0

  constructor(public router: Router, public auth: AuthserviceService) {
    const id = this.auth.getUserId();
    this.auth.getUsers().subscribe({
      next:(res)=>{
        this.users = res.data.users;   // ✅ GraphQL response is wrapped inside res.data
        this.totalUsers = this.users.length; 
      },
      error:(err)=>{
        console.log(`Error while fetching users`,err)
      }
    })
    if (id) {
      this.auth.getUser(id).subscribe({
        next: (res) => {
          this.user = res.data.user;
          console.log(this.user);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
    this.totalUsers = this.users.length

  }


  logout(){
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}


