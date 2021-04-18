export class DoctorDetails {
    private did: string;
    private firstname: string;
    private lastname: string;
    private contactno: string;
    private regNo: string;
    constructor(did: string,
        firstname: string,
        lastname: string,
        contactno: string,
        regNo: string
  ) {
      this.did=did;
      this.firstname=firstname;
      this.lastname=lastname;
      this.contactno=contactno;
      this.regNo=regNo;
  }
  getRegNo(){
      return this.regNo;
  }
}
