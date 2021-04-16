import { DoctorsService } from 'src/app/services/doctors.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css'],
})
export class DoctorDashboardComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private doctorService: DoctorsService
  ) {}

  ngOnInit(): void {}

  onTabChange(tabRefIndex) {
    if (tabRefIndex === 0) {
      this.doctorService.setTabChange('pendingApprovals');
      this.router.navigate(['/doctorDashboard/pendingApprovals']);
    } else if (tabRefIndex === 1) {
      this.doctorService.setTabChange('doctorApproved');
      this.router.navigate(['/doctorDashboard/doctorApproved']);
    } else if (tabRefIndex === 2) {
      this.doctorService.setTabChange('doctorRejected');
      this.router.navigate(['/doctorDashboard/doctorRejected']);
    }
  }
}
