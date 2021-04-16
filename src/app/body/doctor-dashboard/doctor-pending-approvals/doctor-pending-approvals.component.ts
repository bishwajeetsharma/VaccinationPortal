import { PendingApprovals } from './../../../model/pending-approvals.model';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from './../../../services/spinner.service';
import { Component, OnInit } from '@angular/core';
import { DoctorsService } from 'src/app/services/doctors.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-doctor-pending-approvals',
  templateUrl: './doctor-pending-approvals.component.html',
  styleUrls: ['./doctor-pending-approvals.component.css'],
})
export class DoctorPendingApprovalsComponent implements OnInit {
  // private pendingApprovals: PendingApprovals[] = [];
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = [
    'bookingId',
    'firstName',
    'lastName',
    'vaccine',
    'bookingDate',
    'url',
    'button',
  ];

  constructor(
    private doctorService: DoctorsService,
    private spinnerService: SpinnerService,
    private toastrService: ToastrService
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.doctorService.getTabChangeObserver().subscribe((resp) => {
      console.log(resp);
      if (resp === 'pendingApprovals') this.loadPendingApprovals();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadPendingApprovals() {
    const loggedInDoctor = JSON.parse(localStorage.getItem('presentLogin'));
    this.spinnerService.requestStarted();
    this.doctorService.getPendingApprovals(loggedInDoctor.username).subscribe(
      (resp) => {
        this.spinnerService.requestEnded();
        this.toastrService.success(
          'Successfully Fetched all Approvals Requirement!',
          'Successfully Fetched Approvals!'
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
            item['status']
          );
        });
        this.dataSource = new MatTableDataSource(pendingApprovals);
      },
      (error) => {
        console.log(error);
        this.spinnerService.resetSpinner();
        this.toastrService.error(
          error.error.message,
          'Fetching Pending Approvals Failed! Please try again later!'
        );
      }
    );
  }

  selectedRow(id: number) {
    console.log(this.dataSource.data[id]);
  }
}
