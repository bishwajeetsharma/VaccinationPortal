import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserRegisterData } from '../model/user-register-data.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserRegistrationService {
  constructor(private http: HttpClient) {}

  fetchStates(): Observable<any> {
    return this.http.get('/api/region/in/all/', {
      params: new HttpParams().set('key', '5eac16a8c47ac0fb44add21f98f15c9d'),
    });
  }

  fetchCityService(state: string): Observable<any> {
    return this.http.get('/api/city/in/search/', {
      params: new HttpParams()
        .set('region', state)
        .set('key', '5eac16a8c47ac0fb44add21f98f15c9d'),
    });
  }

  registerservice(userregisterdata: UserRegisterData): Observable<any> {
    return this.http.post(
      'http://localhost:8080/registeruser',
      userregisterdata,
      {}
    );
  }
}
