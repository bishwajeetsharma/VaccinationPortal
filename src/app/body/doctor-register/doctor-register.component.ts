import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import {
  NgbDateParserFormatter,
  NgbDatepickerConfig,
} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DoctorRegisterData } from 'src/app/model/doctor-register-data.model';
import { Hospital } from 'src/app/model/hospital.model';
import { SpinnerService } from 'src/app/services/spinner.service';
import { UserRegistrationService } from 'src/app/services/user-registration.service';
import { Doctor } from './../../model/doctor.model';
import { DoctorRegisterForm } from './doctor-register.form';

@Component({
  selector: 'app-doctor-register',
  templateUrl: './doctor-register.component.html',
  styleUrls: ['./doctor-register.component.css'],
})
export class DoctorRegisterComponent implements OnInit {
  doctorRegistrationForm: FormGroup;
  Cities: string[] = [];
  States: string[] = [];
  cityHospitals: string[] = [];
  showAlternateHosp: boolean = false;
  hospitalNumbers: number = 0;

  constructor(
    private service: UserRegistrationService,
    private toastrService: ToastrService,
    private spinnerService: SpinnerService,
    private config: NgbDatepickerConfig,
    private parserFormatter: NgbDateParserFormatter
  ) {
    let date = new Date();
    config.maxDate = {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    };
    config.minDate = { year: 1900, month: 1, day: 1 };
  }

  ngOnInit(): void {
    let doctorRegForm = new DoctorRegisterForm();
    this.doctorRegistrationForm = doctorRegForm.getDoctorRegistrationForm();
    this.fetchStates();
  }

  fetchStates() {
    this.spinnerService.requestStarted();
    this.service.fetchStates().subscribe(
      (data: any) => {
        this.toastrService.success(
          'Received Response for States',
          'Successfully fetched Response'
        );
        this.spinnerService.requestEnded();
        for (var i = 0; i < data.length; i++) this.States.push(data[i].region);
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
    this.service.fetchCityService(state).subscribe(
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

  fetchHospitals(cityFormControl) {
    let city = cityFormControl.value;
    this.spinnerService.requestStarted();
    this.hospitalNumbers = 0;
    this.hospitalsArray.clear();
    this.service.fetchHospitals().subscribe(
      (resp) => {
        this.spinnerService.requestEnded();
        this.cityHospitals.push(...resp.data['medicalColleges']);
        this.cityHospitals = this.cityHospitals.filter((hospital) => {
          if (hospital['city'] === city) return hospital;
        });
        // console.log(this.cityHospitals);
        this.toastrService.success(
          'Fetched Hospitals Successfully',
          'Hospitals Data Status'
        );
      },
      (error) => {
        this.spinnerService.resetSpinner();
        this.toastrService.error(
          'Network error in fetching Hospitals',
          'Hospitals Data Status'
        );
      }
    );
  }

  get hospitalsArray(): FormArray {
    return this.doctorRegistrationForm
      .get('doctordata')
      .get('hospitals') as FormArray;
  }

  public addHospital() {
    // console.log(this.hospitalsArray);
    this.hospitalsArray.push(new FormControl(['']));
    this.showAlternateHosp = true;
    this.hospitalNumbers++;
  }

  getHospitalSelected(value: any) {
    // console.log(value);
    // let index = this.cityHospitals.findIndex((item) => item['name'] == value);
    // this.cityHospitals.splice(index, 1);
    // console.log(this.cityHospitals);
    // this.hospitalNumbers++;
    // console.log(this.hospitalNumbers);
  }

  removeHospital(index: any) {
    this.hospitalsArray.removeAt(index);
  }

  onSubmit() {
    this.spinnerService.requestStarted();
    let hospital = this.getHospitalObjectArray();
    let doctor = new Doctor(
      this.doctorRegistrationForm.get('doctordata').get('firstname').value,
      this.doctorRegistrationForm.get('doctordata').get('lastname').value,
      this.doctorRegistrationForm.get('doctordata').get('gender').value,
      this.doctorRegistrationForm.get('doctordata').get('contactno').value,
      this.doctorRegistrationForm.get('doctordata').get('regNo').value,
      this.parserFormatter.format(
        this.doctorRegistrationForm.controls['dob'].value
      ),
      hospital
    );
    let doctorRegisterData = new DoctorRegisterData(
      doctor,
      this.doctorRegistrationForm.get('locationdata').value,
      this.doctorRegistrationForm.get('authdata').value
    );

    this.service.doctorRegisterService(doctorRegisterData).subscribe(
      (resp) => {
        this.spinnerService.requestEnded();
        this.toastrService.success(resp.message, 'Registration Successful');
      },
      (error) => {
        this.spinnerService.resetSpinner();
        console.log(error);
        this.toastrService.error(error.error.message, 'Registration Failed');
      }
    );
  }

  getHospitalObjectArray() {
    let hospital: string[] = [];
    hospital.push(
      this.doctorRegistrationForm.get('doctordata').get('primaryHospital').value
    );
    hospital.push(
      ...this.doctorRegistrationForm.get('doctordata').get('hospitals').value
    );
    return hospital.map((hosp) => {
      return new Hospital(hosp);
    });
  }
}
