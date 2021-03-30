import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserRegisterData } from '../model/user-register-data.model';
@Injectable({
  providedIn: 'root',
})
export class UserRegistrationService {
  constructor(private http: HttpClient) {}
  states: string[] = [];
  message: string;
  fetchStates(): string[] {
    this.http
      .get('/api/region/in/all/?key=5eac16a8c47ac0fb44add21f98f15c9d')
      .subscribe((data: any) => {
        for (var i = 0; i < data.length; i++) this.states.push(data[i].region);
        // console.log(this.States)
      });
    return this.states;
  }

  fetchCityService(state: string): string[] {
    let city: string[] = [];
    this.http
      .get(
        '/api/city/in/search/?region=' +
          state +
          '&key=5eac16a8c47ac0fb44add21f98f15c9d'
      )
      .subscribe((data: any) => {
        for (var i = 0; i < data.length; i++) city.push(data[i].city);
      });
    return city;
  }

  registerservice(userregisterdata: UserRegisterData) {
    this.http
      .post('http://localhost:8080/registeruser', userregisterdata, {})
      .subscribe((data: any) => {
        this.message = data;
        console.log(this.message);
      });
  }
}
