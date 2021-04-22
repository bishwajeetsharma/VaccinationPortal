import { Appointment } from './../../../model/appointment.model';
import { map } from 'rxjs/operators';
import { PendingApprovals } from './../../../model/pending-approvals.model';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from './../../../services/spinner.service';
import { DoctorsService } from './../../../services/doctors.service';
import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {
  NgbDateParserFormatter,
  NgbDatepickerConfig,
} from '@ng-bootstrap/ng-bootstrap';
import { Dosage } from 'src/app/model/dosage.model';

@Component({
  selector: 'app-doctor-approval',
  templateUrl: './doctor-approval.component.html',
  styleUrls: ['./doctor-approval.component.css'],
})
export class DoctorApprovalComponent implements OnInit, AfterViewChecked {
  doctorValidateForm: FormGroup;
  vaccineAvailability: boolean = false;
  vaccineAvailabilityMessage: string = '';
  proceed: boolean = false;
  rejected: boolean = false;
  times: string[] = [
    '9AM',
    '10AM',
    '11AM',
    '12noon',
    '1PM',
    '2PM',
    '3PM',
    '4PM',
    '5PM',
    '6PM',
    '7PM',
  ];
  hospitals: string[] = [];

  constructor(
    private doctorService: DoctorsService,
    private spinnerService: SpinnerService,
    private toastrService: ToastrService,
    private config: NgbDatepickerConfig,
    private parserFormatter: NgbDateParserFormatter,
    private cdRef: ChangeDetectorRef
  ) {
    this.doctorValidateForm = new FormGroup({
      dosages: new FormArray([]),
      comments: new FormControl('', Validators.required),
    });
    let date = new Date();
    config.minDate = {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    };
  }

  ngOnInit(): void {
    this.addDosages();
  }

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

  addDosages() {
    let selectedPendingApproval: PendingApprovals = this.doctorService.getSelectedPendingApproval();
    for (let i = 0; i < selectedPendingApproval['dosage']; i++) {
      this.DosagesArray.push(this.newDosage());
    }
    console.log(this.doctorValidateForm);
  }

  get DosagesArray(): FormArray {
    return this.doctorValidateForm.get('dosages') as FormArray;
  }

  newDosage(): FormGroup {
    return new FormGroup({
      date: new FormControl(''),
      time: new FormControl(''),
      hospital: new FormControl(''),
    });
  }

  checkAvailability() {
    this.spinnerService.requestStarted();
    this.vaccineAvailabilityMessage = '';
    const loggedInDoctor = JSON.parse(localStorage.getItem('presentLogin'));
    let vaccineName: string = this.doctorService.getSelectedPendingApproval()[
      'vaccine'
    ];
    this.doctorService
      .checkAvailability(loggedInDoctor.username, vaccineName)
      .subscribe(
        (resp) => {
          if (resp.length > 0) {
            this.vaccineAvailabilityMessage = 'Vaccine is Available!!!';
            this.vaccineAvailability = true;
            this.hospitals = resp.map((item) => {
              return item['hospitalName'];
            });
          } else {
            this.vaccineAvailabilityMessage =
              'Not Available. Please check later';
            this.vaccineAvailability = false;
          }
          this.spinnerService.requestEnded();
        },
        (error) => {
          this.vaccineAvailabilityMessage =
            'Error Occured while checking Availabilty';
          console.log(error);
          this.spinnerService.resetSpinner();
        }
      );
  }

  proceedValidation(proceed, rejected) {
    this.proceed = proceed;
    this.rejected = rejected;
  }

  getTimeSelected(time: string) {
    console.log('selected time =', time);
  }

  getHospitalSelected(hospital: string) {
    console.log('selected hospital =', hospital);
  }
  onSubmit(approvedStatus: string) {
    console.log(this.doctorValidateForm);
    this.spinnerService.requestStarted();
    let username = this.doctorService.getSelectedPendingApproval()['userName'];
    let doctorUsername = JSON.parse(localStorage.getItem('presentLogin'))
      .username;
    let vaccineName = this.doctorService.getSelectedPendingApproval()[
      'vaccine'
    ];
    let formValues = this.doctorValidateForm.value;
    let approved = approvedStatus;
    let dosages: Dosage[] = [];
    if (approved === 'YES') {
      for (let i = 0; i < formValues['dosages'].length; i++) {
        let dos = formValues['dosages'][i];
        let dosage = new Dosage(
          i + 1,
          this.parserFormatter.format(dos['date']),
          dos['time'],
          dos['hospital']
        );
        dosages.push(dosage);
      }
    }
    let appointment = new Appointment(
      this.doctorService.getSelectedPendingApproval()['bookingId'],
      username,
      doctorUsername,
      vaccineName,
      dosages,
      approved,
      formValues['comments']
    );
    console.log('Final object =', appointment);
    this.doctorService.appointmentBooking(appointment).subscribe(
      (resp) => {
        this.spinnerService.requestEnded();
        this.toastrService.success(resp.message, 'Vaccination Approved!!');
        this.doctorService.setDialogCloseValue(true);
      },
      (error) => {
        console.log(error);
        this.toastrService.error(error.error.message);
        this.spinnerService.resetSpinner();
        this.doctorService.setDialogCloseValue(true);
      }
    );
  }
}
