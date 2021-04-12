import { Auth } from "./auth.model";
import { Doctor } from './doctor.model';
import { Location } from './location.model';

export class DoctorRegisterData {
    constructor(
      private doctor: Doctor,
      private location: Location,
      private auth: Auth
    ) {}
  }