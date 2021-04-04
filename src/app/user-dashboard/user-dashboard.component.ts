import { Component, OnInit } from '@angular/core';
import { LoginLogoutService } from '../services/login-logout.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit {
  constructor(private service: LoginLogoutService) {}

  ngOnInit(): void {}

  logout() {
    this.service.logout();
  }
}
