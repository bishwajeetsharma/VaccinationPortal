import { SpinnerService } from './../../services/spinner.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserRegisterData } from '../../model/user-register-data.model';
import {
  NgbDateParserFormatter,
  NgbDatepickerConfig,
} from '@ng-bootstrap/ng-bootstrap';
import { UserRegistrationService } from '../../services/user-registration.service';
import { ToastrService } from 'ngx-toastr';
import { RegistrationForm } from './registration-form';
@Component({
  selector: 'app-user-register-form',
  templateUrl: './user-register-form.component.html',
  styleUrls: ['./user-register-form.component.css'],
  // providers: [UserRegistrationService],
})
export class UserRegisterFormComponent implements OnInit {
  registerform: FormGroup;
  Cities: string[] = [];
  States: string[] = [];
  userregisterdata;

  constructor(
    private parserFormatter: NgbDateParserFormatter,
    private service: UserRegistrationService,
    private spinnerService: SpinnerService,
    private toastrService: ToastrService,
    private config: NgbDatepickerConfig
  ) {
    let date = new Date();
    config.maxDate = {
      year: date.getFullYear(),
      month: date.getMonth() + 1 ,
      day: date.getDate()
    };
    config.minDate = { year: 1900, month: 1, day: 1 };
  }

  ngOnInit(): void {
    let form = new RegistrationForm();
    this.registerform = form.getRegistrationForm();
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

  onSubmit() {
    this.spinnerService.requestStarted();
    this.userregisterdata = new UserRegisterData(
      this.registerform.get('userdata').value,
      this.registerform.get('locationdata').value,
      this.registerform.get('authdata').value
    );
    this.userregisterdata.user.dob = this.parserFormatter.format(
      this.registerform.controls['dob'].value
    );
    this.service.registerservice(this.userregisterdata).subscribe(
      (data: any) => {
        this.spinnerService.requestEnded();
        let message = data;
        console.log(message);
        this.toastrService.success(message, 'Registration Successful');
      },
      (error) => {
        this.spinnerService.resetSpinner();
        this.toastrService.error(
          'Registraion Unsuccessful.Please try again later!',
          'Registration Failed. Please Try Again!'
        );
        console.log(error);
      }
    );
  }
}
