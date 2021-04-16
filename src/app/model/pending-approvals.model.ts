export class PendingApprovals {
  constructor(
    private bookingId: number,
    private fileName: string,
    private url: string,
    private type: string,
    private size: number,
    private firstName: string,
    private lastName: string,
    private vaccine: string,
    private bookingDate: string,
    private status : string
  ) {}
}
