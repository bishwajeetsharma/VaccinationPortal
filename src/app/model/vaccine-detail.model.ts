export class VaccineDetail {
  private vaccineName: string;
  private dosage: number;
  private hid: number;
  constructor(
    vaccineName: string,
    dosage: number,
    hid: number
  ) {
    this.hid=hid;
    this.dosage=dosage;
    this.vaccineName=vaccineName;
  }
  getId(){
    return this.hid;
  }
  getName(){
    return this.vaccineName;
  }
}
