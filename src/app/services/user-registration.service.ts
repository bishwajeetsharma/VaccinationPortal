import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { DoctorRegisterData } from '../model/doctor-register-data.model';
import { UserRegisterData } from '../model/user-register-data.model';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserRegistrationService {

  isRegistrationSuccess = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  fetchStates(): Observable<any> {
    return this.http.get(environment.api_config.states_api);
  }

  fetchCityService(state: string): Observable<any> {
    return this.http.get(environment.api_config.cities_api + state);
  }

  registerservice(userregisterdata: UserRegisterData): Observable<any> {
    return this.http.post(
      environment.api_config.base_url + 'user/registeruser',
      userregisterdata,
      {}
    );
  }

  fetchHospitals(): Observable<any> {
    return this.http.get(environment.api_config.external_hospital_api);
  }

  doctorRegisterService(
    doctorRegisterData: DoctorRegisterData
  ): Observable<any> {
    return this.http.post(
      environment.api_config.base_url + 'doctor/registerdoctor',
      doctorRegisterData,
      {}
    );
  }
}
