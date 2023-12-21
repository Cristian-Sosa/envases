import { Injectable } from '@angular/core';
import {
  Observable,
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  share,
} from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class WebConectionService {
  private connectionStatus: string = navigator.onLine ? 'online' : 'offline';
  private connectionStatus$: Observable<string>;

  constructor() {
    this.connectionStatus$ = new Observable<string>();
    this.initConnectionStatus();
  }

  private initConnectionStatus() {
    this.connectionStatus$ = fromEvent(window, 'online').pipe(
      map(() => 'online'),
      debounceTime(100),
      distinctUntilChanged(),
      share()
    );

    fromEvent(window, 'offline')
      .pipe(
        map(() => 'offline'),
        debounceTime(100),
        distinctUntilChanged(),
        share()
      )
      .subscribe((status: string) => {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "info",
          title: `${status}`
        });
        this.connectionStatus = status;
      });
  }

  getConnectionStatus(): string {
    return this.connectionStatus;
  }

  getConnectionStatus$(): Observable<string> {
    return this.connectionStatus$;
  }
}
