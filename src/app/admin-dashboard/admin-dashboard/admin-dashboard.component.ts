import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from 'src/app/services/spinner.service';
import { AdminDashboardService } from '../../services/admin-dashboard.service';
import { HospitalDetail } from '../../model/hospital_details.model';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  vaccineform: FormGroup;
  Hospitals: HospitalDetail[] = [];
  dosage:number[]=[];
  constructor(
    private spinnerService: SpinnerService,
    private toastrService: ToastrService,
    private adminService: AdminDashboardService
  ) {}

  ngOnInit(): void {
    for(var i=1;i<=10;i++)
    this.dosage.push(i);
    this.vaccineform = new FormGroup({
      hospital: new FormControl(null, Validators.required),
      vaccine: new FormControl(null,Validators.required),
      dosage: new FormControl(null,Validators.required) 
    });
    this.fetchHospitals();
  }
  fetchHospitals() {
    this.adminService.fetchHospitals().subscribe((data: any) => {
      for (var i = 0; i < data.length; i++)
      {
        this.Hospitals.push(
          new HospitalDetail(
            data[i][0],
            data[i][1],
          )
        );
      }
    });
  }
  onSubmit() {
    this.spinnerService.requestStarted();
    let hid:number=this.vaccineform.get('hospital').value;
    let vaccine:string=this.vaccineform.get('vaccine').value;
    let dosage:number=this.vaccineform.get('dosage').value;
    this.adminService.saveVaccine(vaccine,dosage,hid).subscribe(data=>{
      this.spinnerService.requestEnded();
      this.toastrService.success(data['message']);
    },
    (error: HttpErrorResponse) => {
      this.spinnerService.resetSpinner();
      this.toastrService.error(error.error.message, 'Updation Failed!');     
    })
  }
}
