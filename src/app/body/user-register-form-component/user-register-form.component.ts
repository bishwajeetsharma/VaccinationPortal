import { SpinnerService } from './../../services/spinner.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserRegisterData } from '../../model/user-register-data.model';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { UserRegistrationService } from '../../services/user-registration.service';
@Component({
  selector: 'app-user-register-form',
  templateUrl: './user-register-form.component.html',
  styleUrls: ['./user-register-form.component.css'],
  providers: [UserRegistrationService],
})
export class UserRegisterFormComponent implements OnInit {
  registerform: FormGroup;
  Cities: string[] = [];
  States: string[] = [];
  userregisterdata;

  constructor(
    private parserFormatter: NgbDateParserFormatter,
    private service: UserRegistrationService,
    private spinnerService: SpinnerService
  ) {}

  match(control: FormControl) {
    if (
      control.get('authdata.password').value !==
      control.get('confirmPassword').value
    )
      return { mismatch: true };
    else return null;
  }

  ngOnInit(): void {
    this.registerform = new FormGroup(
      {
        userdata: new FormGroup({
          firstname: new FormControl('', Validators.required),
          lastname: new FormControl('', Validators.required),
          gender: new FormControl('', Validators.required),
          contactno: new FormControl('', [
            Validators.required,
            Validators.pattern(new RegExp('^[0-9]{10}$')),
          ]),
          aadhar: new FormControl('', [
            Validators.required,
            Validators.pattern(new RegExp('^[0-9]{12}$')),
          ]),
        }),
        dob: new FormControl('', Validators.required),

        locationdata: new FormGroup({
          state: new FormControl('',),
          city: new FormControl('',),
        }),

        authdata: new FormGroup({
          username: new FormControl('', [
            Validators.required,
            Validators.email,
          ]),
          password: new FormControl('', [
            Validators.required,
            Validators.pattern(
              new RegExp(
                '(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*-])(?=.{8,})'
              )
            ),
          ]),
        }),

        confirmPassword: new FormControl('', Validators.required),
      },
      this.match
    );
    this.spinnerService.requestStarted();
    this.service.fetchStates().subscribe(
      (data: any) => {
        this.spinnerService.requestEnded();
        for (var i = 0; i < data.length; i++) this.States.push(data[i].region);
      },
      (error) => {
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
        this.spinnerService.requestEnded();
        for (var i = 0; i < data.length; i++) city.push(data[i].city);
        this.Cities = city;
      },
      (error) => {
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
      },
      (error) => {
        this.spinnerService.resetSpinner();
        console.log(error);
      }
    );
  }
}
