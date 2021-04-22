import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { PendingApprovals } from 'src/app/model/pending-approvals.model';
import { DoctorsService } from 'src/app/services/doctors.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-doctor-rejected',
  templateUrl: './doctor-rejected.component.html',
  styleUrls: ['./doctor-rejected.component.css'],
})
export class DoctorRejectedComponent implements OnInit {
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
      if (resp === 'doctorRejected') this.loadRejectedApprovals();
    });
  }

  loadRejectedApprovals() {
    const loggedInDoctor = JSON.parse(localStorage.getItem('presentLogin'));
    this.spinnerService.requestStarted();
    this.doctorService.getRejectedApprovals(loggedInDoctor.username).subscribe(
      (resp) => {
        this.toastrService.success(
          'Successfully Fetched all Rejected Vaccination Requests!',
          'Successfully Fetched Rejected Requests!'
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
          'Fetching Rejected Requests Failed! Please try again later!'
        );
      }
    );
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
