import { Component, OnInit } from '@angular/core';
import { DoctorsService } from 'src/app/services/doctors.service';

@Component({
  selector: 'app-doctor-rejected',
  templateUrl: './doctor-rejected.component.html',
  styleUrls: ['./doctor-rejected.component.css'],
})
export class DoctorRejectedComponent implements OnInit {
  constructor(private doctorService: DoctorsService) {}

  ngOnInit(): void {
    this.doctorService.getTabChangeObserver().subscribe((resp) => {
      console.log(resp);
    });
  }
}
