export class VaccineDetail {
  private vaccineName: string;
  private dosage: number;
  private hid: number;
  private noOfVaccines?: number;
  constructor(
    vaccineName: string,
    dosage: number,
    hid: number,
    noOfVaccines?: number
  ) {
    this.hid = hid;
    this.dosage = dosage;
    this.vaccineName = vaccineName;
    this.noOfVaccines = noOfVaccines;
  }
  getId() {
    return this.hid;
  }
  getName() {
    return this.vaccineName;
  }
}
