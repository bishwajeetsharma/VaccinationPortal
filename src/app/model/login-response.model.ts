export class LoginResponse {
 
  constructor(
   private username: string,
   private password: string,
   private jwt: string,
   private expDate: number
  ) {
  }

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
}
