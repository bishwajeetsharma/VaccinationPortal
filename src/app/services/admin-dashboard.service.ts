import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {VaccineDetail} from '../model/vaccine-detail.model';
@Injectable({
  providedIn: 'root',
})
export class AdminDashboardService {
  constructor(private http: HttpClient) {}

  fetchHospitals(state:string,city:string) {
    return this.http.get(environment.api_config.base_url + 'hospital/fetchHospital',{params:{state:state,city:city}});
  }

  saveVaccine(vaccineName:string,dosage:number,hid:number){
    let body:VaccineDetail=new VaccineDetail(vaccineName,dosage,hid);
    return this.http.post(environment.api_config.base_url + 'vaccine/saveVaccine',body);
  }
  fetchVaccines(hid:string){
    return this.http.get(environment.api_config.base_url+'vaccine/fetchVaccinebyHid',{params:{hospitalId:hid}});
  }
  deleteVaccine(deletebody:any){
    return this.http.post(environment.api_config.base_url+'vaccine/deleteVaccine',deletebody);
  }
}
