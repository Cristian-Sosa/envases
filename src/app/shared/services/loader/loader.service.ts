import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loaderState: boolean;
  private _loaderState: BehaviorSubject<boolean>;

  constructor() {
    this.loaderState = false;
    this._loaderState = new BehaviorSubject(this.loaderState);
  }

  getLoaderStateObservable = (): Observable<boolean> =>
    this._loaderState.asObservable();

  showLoader = (): void => {
    this.loaderState = true;
    console.log('true')
    this._loaderState.next(this.loaderState)
  }

  hideLoader = (): void => {
    this.loaderState = false;
    console.log('false')
    this._loaderState.next(this.loaderState)
  }
}
