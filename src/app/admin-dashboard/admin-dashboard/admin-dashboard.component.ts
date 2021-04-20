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
  
  ngOnInit(): void {
    
  }
 
}
