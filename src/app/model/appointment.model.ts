import { Dosage } from './dosage.model';

export class Appointment {
  constructor(
    private bookingId: number,
    private userName: string,
    private doctorUsername: string,
    private vaccineName: string,
    private dosages: Dosage[],
    private approved: string,
    private comments: string
  ) {}
}
