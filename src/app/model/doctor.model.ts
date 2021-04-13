import { Hospital } from "./hospital.model";

export class Doctor {
  constructor(
    private firstname: string,
    private lastname: string,
    private gender: string,
    private contactno: string,
    private regNo: string,
    private dob?: string,
    private hospital?: Hospital[]
  ) {}
}
