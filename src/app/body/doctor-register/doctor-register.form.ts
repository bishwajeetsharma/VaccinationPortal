import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
export class DoctorRegisterForm {
  match(control: FormControl) {
    if (
      control.get('authdata.password').value !==
      control.get('confirmPassword').value
    )
      return { mismatch: true };
    else return null;
  }

  doctorRegistrationForm = new FormGroup(
    {
      doctordata: new FormGroup({
        firstname: new FormControl('', Validators.required),
        lastname: new FormControl('', Validators.required),
        gender: new FormControl('', Validators.required),
        contactno: new FormControl('', [
          Validators.required,
          Validators.pattern(new RegExp('^[0-9]{10}$')),
        ]),
        regNo: new FormControl('', [
          Validators.required,
          Validators.pattern(new RegExp('^[0-9]{12}$')),
        ]),
        primaryHospital: new FormControl('', Validators.required),
        hospitals: new FormArray([]),
      }),
      dob: new FormControl('', Validators.required),

      locationdata: new FormGroup({
        state: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
      }),

      // primaryHospital: new FormControl('', Validators.required),
      // hospitals: new FormArray([]),

      authdata: new FormGroup({
        username: new FormControl('', [
          Validators.required,
          Validators.email,
          Validators.pattern('^.+@gmail.com$'),
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

  public getDoctorRegistrationForm() {
    return this.doctorRegistrationForm;
  }

  //   public get hospitals(): FormArray {
  //     return this.doctorRegistrationForm.get('hospitals') as FormArray;
  //   }

  //   public addHospital() {
  //     this.hospitals.push(new FormControl('', Validators.required));
  //   }
}
