import { PendingApprovals } from './../model/pending-approvals.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs/operators';
import { Appointment } from '../model/appointment.model';

@Injectable({
  providedIn: 'root',
})
export class DoctorsService {
  tabChange = new BehaviorSubject<string>('pendingApprovals');
  selectedPendingApproval: PendingApprovals;
  dialogClose: boolean = false;

  constructor(private http: HttpClient) {}

  getPendingApprovals(userName: String): Observable<any> {
    return this.http.get(
      environment.api_config.base_url + 'doctor/pendingApprovals/' + userName
    );
    // return this.http.get('../../assets/Test/PendingApprovals.json');
  }

  getTabChangeObserver(): Observable<string> {
    return this.tabChange.asObservable();
  }

  setTabChange(value: string) {
    this.tabChange.next(value);
  }

  setSelectedPendingApproval(pendingApproval: PendingApprovals) {
    this.selectedPendingApproval = pendingApproval;
  }

  getSelectedPendingApproval(): PendingApprovals {
    return this.selectedPendingApproval;
  }

  checkAvailability(userName: any, vaccineName: string): Observable<any> {
    return this.http.get(
      environment.api_config.base_url + 'doctor/checkAvailability',
      {
        params: new HttpParams()
          .set('userName', userName)
          .set('vaccine', vaccineName),
      }
    );
  }

  appointmentBooking(appointment: Appointment): Observable<any> {
    return this.http.post(
      environment.api_config.base_url + 'doctor/vaccineAppointment',
      appointment
    );
  }

  setDialogClosed(val: boolean) {
    this.dialogClose = val;
  }

  getDialogClosed() {
    return this.dialogClose;
  }
}
