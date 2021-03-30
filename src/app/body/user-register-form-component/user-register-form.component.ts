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
  constructor(
    private parserFormatter: NgbDateParserFormatter,
    private service: UserRegistrationService
  ) {}
  registerform: FormGroup;
  Cities: string[] = [];
  States: string[] = [];

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
          state: new FormControl('', Validators.required),
          city: new FormControl('', Validators.required),
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
    this.States = this.service.fetchStates();
  }
  fetchCities(state: string) {
    this.Cities = this.service.fetchCityService(state);
  }
  userregisterdata;
  onSubmit() {
    this.userregisterdata = new UserRegisterData(
      this.registerform.get('userdata').value,
      this.registerform.get('locationdata').value,
      this.registerform.get('authdata').value
    );
    this.userregisterdata.user.dob = this.parserFormatter.format(
      this.registerform.controls['dob'].value
    );
    this.service.registerservice(this.userregisterdata);
    console.log(this.userregisterdata);
  }
}
