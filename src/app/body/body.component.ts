import { Component, OnInit } from '@angular/core';
import { LoginLogoutService } from '../services/login-logout.service';
@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
})
export class BodyComponent implements OnInit {
  isLoggedin: boolean;
  role: String;
  constructor(private loginservice: LoginLogoutService) {}

  ngOnInit(): void {
    this.loginservice.isLogin.subscribe((data: boolean) => {
      this.isLoggedin = data;
      if (data) {
        const loggedinUser = JSON.parse(localStorage.getItem('presentLogin'));
        this.role = loggedinUser.role;
        console.log('Role = ', this.role);
      }
    });
  }
}
