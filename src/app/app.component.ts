import { SpinnerService } from './services/spinner.service';
import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit, AfterViewChecked {
  title = 'VaccinationPortal';
  spinner = false;
  showOverlay: boolean = false;
  constructor(
    private spinnerService: SpinnerService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

  ngOnInit(): void {
    this.spinner = true;
    this.spinnerService.requestStarted();
    setTimeout(() => {
      this.spinnerService.resetSpinner();
      this.spinner = false;
    }, 3000);
    this.cdRef.detectChanges();
  }

  ngAfterViewInit(): void {
    this.spinnerService.requestStarted();
    this.spinnerService.getSpinnerObserver().subscribe((status) => {
      if (status === 'start') this.showOverlay = true;
      else if (status == 'stop') this.showOverlay = false;
    });
    this.cdRef.detectChanges();
  }
}
