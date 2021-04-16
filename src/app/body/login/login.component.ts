import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginRequest } from 'src/app/model/login-request.model';
import { LoginResponse } from 'src/app/model/login-response.model';
import { LoginLogoutService } from 'src/app/services/login-logout.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private loginservice: LoginLogoutService,
    private spinnerService: SpinnerService,
    private router: Router,
    private toastrservice: ToastrService
  ) {}
  loginForm: FormGroup;
  loginrequest: LoginRequest;
  loginresponse: LoginResponse;
  errormsg: string = null;
  iserror = false;
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }
  authenticate() {
    this.spinnerService.requestStarted();
    this.loginrequest = new LoginRequest(
      this.loginForm.get('username').value,
      this.loginForm.get('password').value
    );
    this.loginservice.login(this.loginrequest).subscribe(
      (data: LoginResponse) => {
        this.toastrservice.success(
          'Successfully Logged in!',
          'Login Successful'
        );

        // console.log(data);
        this.loginresponse = data;
        this.spinnerService.requestEnded();
        this.loginservice.isLogin.next(true);
        const loggedinUser = JSON.parse(localStorage.getItem('presentLogin'));
        console.log('Login Role =', loggedinUser.role);
        if (loggedinUser.role === 'user')
          this.router.navigate(['/userDashboard']);
        else if (loggedinUser.role === 'doctor')
          this.router.navigate(['/doctorDashboard/pendingApprovals']);
        else if (loggedinUser.role === 'admin')
          this.router.navigate(['/adminDashboard']);
      },
      (error: HttpErrorResponse) => {
        this.errormsg = error.error.message;
        this.toastrservice.error(this.errormsg, 'Login Failed');
        this.spinnerService.resetSpinner();
        console.log(error);
        this.iserror = true;
      }
    );
  }
}
