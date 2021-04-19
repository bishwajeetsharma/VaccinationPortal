import { LoginLogoutService } from 'src/app/services/login-logout.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../util_module/dialog/dialog.component';
import { UtilService } from '../services/util.service';
import { RegisterDialogComponent } from '../util_module/register-dialog/register-dialog.component';
import { UserRegistrationService } from '../services/user-registration.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private utilService: UtilService,
    private loginservice: LoginLogoutService,
    private registrationService: UserRegistrationService,
    private loginService: LoginLogoutService
  ) {}
  show: boolean;
  accountManage: boolean = false;
  accountName: string = 'Account Manage';

  ngOnInit(): void {
    
    this.loginService.isLogin.subscribe((resp) => {
      this.accountManage = resp;
      if (this.accountManage) {
        let accountInfo = JSON.parse(localStorage.getItem('presentLogin'));
        if (accountInfo.role === 'doctor')
          this.accountName =
            'Dr. ' + accountInfo.firstname + ' ' + accountInfo.lastname;
        else
          this.accountName = accountInfo.firstname + ' ' + accountInfo.lastname;
      }
    });
  }

  openDialog() {
    this.utilService.loadDataSetSpinner();
    setTimeout(() => {
      this.utilService.loadedDataUnsetSpinner();
    }, 10000);

    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      height: 'auto',
    });
    this.loginservice.isLogin.subscribe((data) => {
      if (data) dialogRef.close();
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog Closed');
    });
  }

  openRegisterDialog() {
    const registerDialog = this.dialog.open(RegisterDialogComponent, {
      width: '500px',
      height: 'auto',
    });
    this.registrationService.isRegistrationSuccess.subscribe((resp) => {
      if (resp) registerDialog.close();
    });
  }

  logout() {
    this.loginService.logout();
    this.accountName = 'Account Manage';
  }
}
