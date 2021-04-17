import { PendingApprovalComponent } from './../../../util_module/pending-approval/pending-approval.component';
import { PendingApprovals } from './../../../model/pending-approvals.model';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from './../../../services/spinner.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DoctorsService } from 'src/app/services/doctors.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-doctor-pending-approvals',
  templateUrl: './doctor-pending-approvals.component.html',
  styleUrls: ['./doctor-pending-approvals.component.css'],
})
export class DoctorPendingApprovalsComponent implements OnInit {
  // private pendingApprovals: PendingApprovals[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource();
  length: any;
  pageSizeOptions: number[] = [5, 10];
  pageSize = 5;
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
    private toastrService: ToastrService,
    public dialog: MatDialog
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
            item['status'],
            item['userName'],
            item['dosage']
          );
        });
        this.dataSource = new MatTableDataSource(pendingApprovals);
        this.length = this.dataSource.data.length;
        console.log(this.length);
        this.dataSource.paginator = this.paginator;
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
    let pendingApproval: PendingApprovals = (this.dataSource.data[
      id
    ] as unknown) as PendingApprovals;
    this.doctorService.setSelectedPendingApproval(pendingApproval);
    console.log(this.doctorService.getSelectedPendingApproval());
    this.openPendingApprovalDialog();
  }

  openPendingApprovalDialog() {
    const dialogRef = this.dialog.open(PendingApprovalComponent, {
      width: '700px',
      height: '500px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog Closed');
    });
  }
}
