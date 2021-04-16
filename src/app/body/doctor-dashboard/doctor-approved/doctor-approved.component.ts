import { DoctorsService } from 'src/app/services/doctors.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doctor-approved',
  templateUrl: './doctor-approved.component.html',
  styleUrls: ['./doctor-approved.component.css'],
})
export class DoctorApprovedComponent implements OnInit {
  constructor(private doctorService: DoctorsService) {}

  ngOnInit(): void {
    this.doctorService.getTabChangeObserver().subscribe((resp) => {
      console.log(resp);
    });
  }
}
