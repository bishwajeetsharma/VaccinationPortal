import { LoginComponent } from './../body/login/login.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../util_module/dialog/dialog.component';
import { RegisterDialogComponent } from '../util_module/register-dialog/register-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}
  openDialog() {
    console.log('Login clicked');
    const dialogRef = this.dialog.open(DialogComponent, {
      width: 'auto',
      height: 'auto',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog Closed');
    });
  }
  openRegisterDialog() {
    const registerDialog = this.dialog.open(RegisterDialogComponent, {
      width: 'auto',
      height: 'auto',
    });
  }
}
