import { DoctorsService } from 'src/app/services/doctors.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SpinnerService } from 'src/app/services/spinner.service';
import { ToastrService } from 'ngx-toastr';
import { PendingApprovals } from 'src/app/model/pending-approvals.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-doctor-approved',
  templateUrl: './doctor-approved.component.html',
  styleUrls: ['./doctor-approved.component.css'],
})
export class DoctorApprovedComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  length: any;
  dataSource = new MatTableDataSource();
  pageSizeOptions: number[] = [5, 10];
  pageSize = 5;
  displayedColumns: string[] = [
    'bookingId',
    'firstName',
    'lastName',
    'vaccine',
    'bookingDate',
    'url',
    'status'
  ];

  constructor(
    private doctorService: DoctorsService,
    private spinnerService: SpinnerService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.doctorService.getTabChangeObserver().subscribe((resp) => {
      console.log(resp);
      if (resp === 'doctorApproved') this.loadApprovedApprovals();
    });
  }

  loadApprovedApprovals() {
    const loggedInDoctor = JSON.parse(localStorage.getItem('presentLogin'));
    this.spinnerService.requestStarted();
    this.doctorService.getApprovedApprovals(loggedInDoctor.username).subscribe(
      (resp) => {
        this.toastrService.success(
          'Successfully Fetched all Approved Vaccination Requests!',
          'Successfully Fetched Approved Requests!'
        );
        let pendingApprovals = resp.map((item) => {
          return new PendingApprovals(
            item['bookingId'],
            item['fileName'],
            item['url'],
            item['type'],
            item['size'],
            item['firstName'],
            item['lastName'],
            item['vaccine'],
            item['bookingDate'],
            item['status'],
            item['userName'],
            item['dosage']
          );
        });
        this.dataSource = new MatTableDataSource(pendingApprovals);
        this.length = this.dataSource.data.length;
        console.log(this.length);
        this.dataSource.paginator = this.paginator;
        this.spinnerService.requestEnded();
      },
      (error) => {
        console.log(error);
        this.spinnerService.resetSpinner();
        this.toastrService.error(
          error.error.message,
          'Fetching Approved Requests Failed! Please try again later!'
        );
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
