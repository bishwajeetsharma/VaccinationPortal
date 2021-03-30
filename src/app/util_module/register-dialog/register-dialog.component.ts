import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.css']
})
export class RegisterDialogComponent implements OnInit {

  private index:number=0;
  constructor() { }

  ngOnInit(): void {
  }
  onTabChange(index: number) {
    if (index === 0) {
      console.log('User');
      this.index= index
    } else if (index === 1) {
      console.log('Doctor');
      this.index = index;
    }
  }

}
