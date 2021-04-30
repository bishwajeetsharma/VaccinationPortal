import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from 'src/app/services/spinner.service';
import { AdminDashboardService } from '../../services/admin-dashboard.service';
import { HospitalDetail } from '../../model/hospital_details.model';
import { HttpErrorResponse } from '@angular/common/http';
import { UserRegistrationService } from 'src/app/services/user-registration.service';
@Component({
  selector: 'app-admin-vaccine-update',
  templateUrl: './admin-vaccine-update.component.html',
  styleUrls: ['./admin-vaccine-update.component.css'],
})
export class AdminVaccineUpdateComponent implements OnInit {
  vaccineform: FormGroup;
  Hospitals: HospitalDetail[] = [];
  dosage: number[] = [];
  Cities: string[] = [];
  States: string[] = [];
  constructor(
    private spinnerService: SpinnerService,
    private toastrService: ToastrService,
    private adminService: AdminDashboardService,
    private userRegistrationService: UserRegistrationService
  ) {}

  ngOnInit(): void {
    for (var i = 1; i <= 10; i++) this.dosage.push(i);
    this.vaccineform = new FormGroup({
      state: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      hospital: new FormControl(null, Validators.required),
      vaccine: new FormControl(null, Validators.required),
      dosage: new FormControl(null, Validators.required),
      vaccineNo: new FormControl(null, Validators.required),
    });
    this.userRegistrationService.fetchStates().subscribe(
      (data: any) => {
        this.toastrService.success(
          'Received Response for States',
          'Successfully fetched Response'
        );
        this.spinnerService.requestEnded();
        let state = [];
        for (var i = 0; i < data.length; i++) state.push(data[i].region);
        this.States = state;
      },
      (error) => {
        this.toastrService.error(
          'Response for States Failed',
          'Failure in fetching Response'
        );
        this.spinnerService.resetSpinner();
        console.log(error);
      }
    );
  }
  fetchCities(state: string) {
    let city: string[] = [];
    this.spinnerService.requestStarted();
    this.userRegistrationService.fetchCityService(state).subscribe(
      (data: any) => {
        this.toastrService.success(
          'Received Response for Cities',
          'Successfully fetched Response'
        );
        this.spinnerService.requestEnded();
        for (var i = 0; i < data.length; i++) city.push(data[i].city);
        this.Cities = city;
      },
      (error) => {
        this.toastrService.error(
          'Response for Cities Failed',
          'Failure in fetching Response'
        );
        this.spinnerService.requestEnded();
        console.log(error);
      }
    );
  }
  fetchHospitals(state: string, city: string) {
    this.spinnerService.requestStarted();
    this.adminService.fetchHospitals(state, city).subscribe(
      (data: any) => {
        this.toastrService.success(
          'Received Response for Hospitals',
          'Successfully fetched Response'
        );
        this.spinnerService.requestEnded();
        let hospitals = [];
        for (var i = 0; i < data.length; i++) {
          hospitals.push(new HospitalDetail(data[i][0], data[i][1]));
        }
        this.Hospitals = hospitals;
      },
      (error: HttpErrorResponse) => {
        this.spinnerService.resetSpinner();
        this.toastrService.error(
          error.error.message,
          'Failed to fetch hospitals!'
        );
      }
    );
  }
  onSubmit() {
    this.spinnerService.requestStarted();
    let hid: number = this.vaccineform.get('hospital').value;
    let vaccine: string = this.vaccineform.get('vaccine').value;
    let dosage: number = this.vaccineform.get('dosage').value;
    let noOfVaccines: number = this.vaccineform.get('vaccineNo').value;
    this.adminService.saveVaccine(vaccine, dosage, hid, noOfVaccines).subscribe(
      (data) => {
        this.spinnerService.requestEnded();
        this.toastrService.success(data['message']);
      },
      (error: HttpErrorResponse) => {
        this.spinnerService.resetSpinner();
        this.toastrService.error(error.error.message, 'Updation Failed!');
      },
      () => {
        this.vaccineform.reset();
      }
    );
  }
}
