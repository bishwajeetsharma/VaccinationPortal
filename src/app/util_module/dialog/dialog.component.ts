import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  private index: number = 0;
  constructor() {}

  ngOnInit(): void {}

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
