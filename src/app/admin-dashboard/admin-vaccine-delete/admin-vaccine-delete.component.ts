import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from 'src/app/services/spinner.service';
import { AdminDashboardService } from '../../services/admin-dashboard.service';
import { HospitalDetail } from '../../model/hospital_details.model';
import { HttpErrorResponse } from '@angular/common/http';
import { UserRegistrationService } from 'src/app/services/user-registration.service';
import { VaccineDetail } from 'src/app/model/vaccine-detail.model';
@Component({
  selector: 'app-admin-vaccine-delete',
  templateUrl: './admin-vaccine-delete.component.html',
  styleUrls: ['./admin-vaccine-delete.component.css'],
})
export class AdminVaccineDeleteComponent implements OnInit {
  vaccineform: FormGroup;
  Hospitals: HospitalDetail[] = [];
  Cities: string[] = [];
  States: string[] = [];
  Vaccines: VaccineDetail[] = [];
  constructor(
    private spinnerService: SpinnerService,
    private toastrService: ToastrService,
    private adminService: AdminDashboardService,
    private userRegistrationService: UserRegistrationService
  ) {}

  ngOnInit(): void {
    this.vaccineform = new FormGroup({
      state: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      hospital: new FormControl(null, Validators.required),
      vaccine: new FormControl(null, Validators.required),
    });
    this.userRegistrationService.fetchStates().subscribe(
      (data: any) => {
        this.toastrService.success(
          'Received Response for States',
          'Successfully fetched Response'
        );
        this.spinnerService.requestEnded();
        let states = [];
        for (var i = 0; i < data.length; i++) states.push(data[i].region);
        this.States = states;
      },
      (error: HttpErrorResponse) => {
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
  fetchVaccines(hid: any) {
    this.spinnerService.requestStarted();
    this.adminService.fetchVaccines(hid).subscribe(
      (data: any) => {
        this.toastrService.success(
          'Received Response for Vaccines',
          'Successfully fetched Response'
        );
        this.spinnerService.requestEnded();
        let vaccinesList = [];
        for (var i = 0; i < data.length; i++)
          vaccinesList.push(
            new VaccineDetail(
              data[i]['vaccineName'],
              data[i]['dosage'],
              data[i]['hid']
            )
          );
        this.Vaccines = vaccinesList;
      },
      (error: HttpErrorResponse) => {
        this.spinnerService.resetSpinner();
        this.toastrService.error(
          error.error.message,
          'Failed to fetch vaccines!'
        );
      }
    );
  }
  onSubmit() {
    this.spinnerService.requestStarted();
    let hid: number = this.vaccineform.get('hospital').value;
    let vid: number = this.vaccineform.get('vaccine').value;
    const deletebody: { hid: number; vid: number } = { hid, vid };
    this.adminService.deleteVaccine(deletebody).subscribe(
      (data) => {
        this.spinnerService.requestEnded();
        this.toastrService.success(data['message']);
      },
      (error: HttpErrorResponse) => {
        this.toastrService.error(error.error.message, 'Failed!');
        this.spinnerService.resetSpinner();
      },
      () => {
        this.vaccineform.reset();
      }
    );
  }
}
