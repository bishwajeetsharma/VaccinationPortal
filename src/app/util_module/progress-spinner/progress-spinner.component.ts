
import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-progress-spinner',
  templateUrl: './progress-spinner.component.html',
  styleUrls: ['./progress-spinner.component.css'],
})
export class ProgressSpinnerComponent implements OnInit {
  showSpinner = false;
  constructor(private utilService: UtilService) {}

  ngOnInit(): void {
    this.showSpinner = this.utilService.loadDataSetSpinner();
  }
}
