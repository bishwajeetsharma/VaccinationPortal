import { SpinnerService } from './../../services/spinner.service';

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-progress-spinner',
  templateUrl: './progress-spinner.component.html',
  styleUrls: ['./progress-spinner.component.css'],
})
export class ProgressSpinnerComponent implements OnInit {
  showSpinner = false;
  constructor(
    private spinnerService: SpinnerService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.spinnerService.getSpinnerObserver().subscribe((status) => {
      if (status === 'start') {
        this.showSpinner = true;
      } else {
        this.showSpinner = false;
      }
      this.cdRef.detectChanges();
    });
  }
}
