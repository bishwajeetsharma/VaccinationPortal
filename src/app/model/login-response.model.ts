export class LoginResponse {
  constructor(
    private firstname: string,
    private lastname: string,
    private id: number,
    private username: string,
    private password: string,
    private jwt: string,
    private expDate: number,
    private role:string
  ) {}

  getUsername() {
    return this.username;
  }
  getPassword() {
    return this.password;
  }
  getJwt() {
    if (this.expDate < new Date().getTime()) return null;
    else return this.jwt;
  }
  getExpDate() {
    if (this.expDate < new Date().getTime()) return null;
    else return this.expDate;
  }
  getFirstname() {
    return this.firstname;
  }
  getLastname() {
    return this.lastname;
  }
  getId() {
    return this.id;
  }
  getRole(){
    return this.role;
  }
}
