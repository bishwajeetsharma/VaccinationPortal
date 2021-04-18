import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { environment } from './../../environments/environment';
import { LoginLogoutService } from './login-logout.service';
@Injectable({
  providedIn: 'root',
})
export class UserDashboardService {
  constructor(
    private http: HttpClient,
    private loginservice: LoginLogoutService
  ) {}
  username: string = '';
  fetchVaccines() {
    return this.http.get(
      environment.api_config.base_url + 'vaccine/fetchvaccine'
    );
  }
  fetchDoctors() {
    this.loginservice.principal.subscribe((data) => {
      if (data !== null) this.username = data.getUsername();
    });
    return this.http.get(
      environment.api_config.base_url + 'doctor/getDoctorsByCity',
      { params: { username: this.username } }
    );
  }
  applyBooking(bookingData: FormGroup, file: File) {
    let username: string;
    this.loginservice.principal.subscribe((data) => {
      if (data !== null) username = data.getUsername();
    });
    let body = new FormData();
    body.append('file', file);
    return this.http.post(
      environment.api_config.base_url + 'user/vaccineBooking',
      body,
      {
        params: new HttpParams()
          .set('username', username)
          .set('vaccineName', bookingData.get('vaccineName').value)
          .set('docRegNo', bookingData.get('docRegNo').value),
      }
    );
  }
}
