import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoginLogoutService } from '../services/login-logout.service';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit {
  constructor(private service: LoginLogoutService, private http: HttpClient) {}
  ngOnInit(): void {
    
  }

  checkDashboard()
  {
    this.http
      .get(environment.api_config.base_url + 'user/dashboard')
      .subscribe((data) => {
        console.log(data);
      });
  }
  logout() {
    this.service.logout();
  }
}
