import { FormControl, FormGroup, Validators } from '@angular/forms';

export class RegistrationForm {
  match(control: FormControl) {
    if (
      control.get('authdata.password').value !==
      control.get('confirmPassword').value
    )
      return { mismatch: true };
    else return null;
  }

  registrationForm = new FormGroup(
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
        username: new FormControl('', [Validators.required, Validators.email]),
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

  public getRegistrationForm() {
    return this.registrationForm;
  }
}
