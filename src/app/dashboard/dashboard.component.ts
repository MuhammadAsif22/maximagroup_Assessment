import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from 'src/app/service/service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  Admin = false;
  Name = '';
  Email = '';
  MobileNo = '';
  Address = '';
  roles = '';
  constructor(private router: Router, private service: Service) {}

  ngOnInit(): void {
    //Get User Service
    this.service.GetUserData().subscribe(
      (data) => {
        console.log('User Data', data);
        if (data != null) {
          this.Email = data.data.email;
          this.Name = data.data.userName;
          this.MobileNo = data.data.phoneNumber;
          this.Address = 'Dubai';
          localStorage.setItem('UserEmail', data.data.email);
        }
      },
      (error) => {
        if (error || error.status === 401) this.router.navigateByUrl('/login');
      }
    );
    this.roles = localStorage.getItem('role')?.replace(/\"/g, '') ?? '';
    //set role
    if (this.roles == 'Administrator') {
      this.Admin = true;
    }
  }
}
