import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  showSpinner = false;
  constructor() {}

  loadDataSetSpinner(): boolean {
    // this.showSpinner = true;
    // setTimeout(() => {}, 5000);
    return true;
  }

  loadedDataUnsetSpinner() {
    return false;
  }
}
