import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../model/login-request.model';
import { LoginResponse } from '../model/login-response.model';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class LoginLogoutService {
  principal = new BehaviorSubject<LoginResponse>(null);
  isLogin = new BehaviorSubject<boolean>(false);
  tokenExpiration: any;
  constructor(private http: HttpClient, private router: Router) {}

  login(loginrequest: LoginRequest) {
    return this.http
      .post<LoginResponse>(
        environment.api_config.base_url + 'authenticate/login',
        loginrequest
      )
      .pipe(
        tap((data: LoginResponse) => {
          console.log(data);
          const Userdata = new LoginResponse(
            data['username'],
            data['password'],
            data['jwt'],
            data['expirationDate']
          );

          console.log(Userdata);
          this.principal.next(Userdata);
          const expirationCounter =
            Userdata.getExpDate() - new Date().getTime();
          console.log(expirationCounter);
          localStorage.setItem('presentLogin', JSON.stringify(Userdata));
          this.autologout(expirationCounter);
        })
      );
  }
  logout() {
    this.isLogin.next(false);
    this.principal.next(null);
    localStorage.removeItem('presentLogin');
    if (this.tokenExpiration) clearTimeout(this.tokenExpiration);
    this.tokenExpiration = null;
    this.router.navigate(['']);
  }

  autologout(expirationTime: number) {
    this.tokenExpiration = setTimeout(() => {
      this.logout();
    }, expirationTime);
  }

  autoLogin() {
    const loggedinUser = JSON.parse(localStorage.getItem('presentLogin'));
    if (!loggedinUser) return;
    const newUser = new LoginResponse(
      loggedinUser.username,
      loggedinUser.password,
      loggedinUser.jwt,
      loggedinUser.expDate
    );
    if (!newUser.getJwt()) {
      this.principal.next(newUser);
      this.isLogin.next(true);
      this.autologout(newUser.getExpDate() - new Date().getTime());
    }
  }
}
