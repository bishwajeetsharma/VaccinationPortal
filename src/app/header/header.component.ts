import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../util_module/dialog/dialog.component';
import { UtilService } from '../services/util.service';
import { RegisterDialogComponent } from '../util_module/register-dialog/register-dialog.component';
import { LoginLogoutService } from '../services/login-logout.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private utilService: UtilService,
    private loginservice: LoginLogoutService
  ) {}
  show: boolean;
  ngOnInit(): void {}
  openDialog() {
    console.log('Login clicked');
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
  }
}
