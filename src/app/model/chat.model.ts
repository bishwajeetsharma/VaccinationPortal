export class Chat {
  private fromId: number;
  private toId: number;
  private message: string;
  private date: number;
  constructor(fromId: number, toId: number, message: string, date: number) {
    this.fromId = fromId;
    this.toId = toId;
    this.message = message;
    this.date = date;
  }
  getFromId() {
    return this.fromId;
  }
  getToId() {
    return this.toId;
  }
  getMessage() {
    return this.message;
  }
  getDate() {
    return new Date(this.date);
  }
}
