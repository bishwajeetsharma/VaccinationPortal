import { Component, OnInit } from '@angular/core';
import { LoginLogoutService } from '../services/login-logout.service';
import { UserDashboardService } from '../services/user-dashboard.service';
import { DoctorDetails } from '../model/doctorDetails.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SpinnerService } from 'src/app/services/spinner.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit {
  DoctorList: DoctorDetails[] = [];
  VaccineList: string[] = [];
  bookingform: FormGroup;
  file: File;
  constructor(
    private service: LoginLogoutService,
    private userDashboardService: UserDashboardService,
    private spinnerService: SpinnerService,
    private toastrservice: ToastrService
  ) {}
  ngOnInit(): void {
    this.bookingform = new FormGroup({
      docRegNo: new FormControl('', Validators.required),
      vaccineName: new FormControl('', Validators.required),
      file: new FormControl(null, Validators.required),
    });
    this.fetchDoctors();
    this.fetchVaccines();
  }
  onSelectFile(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0)
      this.file = event.target.files[0];
  }
  fetchVaccines() {
    this.userDashboardService.fetchVaccines().subscribe((data: string) => {
      for (var i = 0; i < data.length; i++) this.VaccineList.push(data[i]);
    });
  }
  fetchDoctors() {
    this.userDashboardService.fetchDoctors().subscribe((data: any) => {
      for (var i = 0; i < data.length; i++)
        this.DoctorList.push(
          new DoctorDetails(
            data[i]['did'],
            data[i]['firstname'],
            data[i]['lastname'],
            data[i]['contactno'],
            data[i]['regNo']
          )
        );
    });
  }
  onSubmit() {
    this.spinnerService.requestStarted();
    this.userDashboardService
      .applyBooking(this.bookingform, this.file)
      .subscribe(
        (data: any) => {
          this.spinnerService.requestEnded();
          this.toastrservice.success(data['message']);
        },
        (error: HttpErrorResponse) => {
          this.toastrservice.error(error.error.message, 'Booking Failed!');
          this.spinnerService.resetSpinner();
        }
      );
  }
  logout() {
    this.service.logout();
  }
}
