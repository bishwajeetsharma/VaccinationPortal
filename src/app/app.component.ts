import { Component, OnInit } from '@angular/core';
import { UtilService } from './services/util.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'VaccinationPortal';
  spinner = false;
  constructor(private utilService: UtilService) {}

  ngOnInit(): void {
    this.spinner = this.utilService.loadDataSetSpinner();
    console.log(this.spinner);
    setTimeout(() => {
      this.spinner = this.utilService.loadedDataUnsetSpinner();
    }, 2000);
  }
}
