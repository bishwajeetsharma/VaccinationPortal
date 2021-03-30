export class User {
  constructor(
    private firstname: string,
    private lastname: string,
    private gender: string,
    private contactno: string,
    private uid: string,
    private dob?: string
  ) {}
}
