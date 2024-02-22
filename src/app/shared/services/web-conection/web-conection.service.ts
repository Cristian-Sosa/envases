import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subscribable,
  Subscription,
  fromEvent,
  merge,
  of,
} from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  share,
  catchError,
  tap,
} from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ValeService } from '../vale';

@Injectable({
  providedIn: 'root',
})
export class WebConnectionService {
  // private connectionStatus: string = navigator.onLine ? 'online' : 'offline';
  // private connectionStatus$!: Observable<string>;

  private status: string = 'online';
  private connection!: any;

  constructor(private valeSrv: ValeService) {
    // Inyecta el servicio ValeService
    // this.initConnectionStatus();
  }

  // initConnectionStatus = (): Subscription => {
  //   const online$ = fromEvent(window, 'online').pipe(
  //     map(() => 'online'),
  //     debounceTime(100),
  //     distinctUntilChanged()
  //   );

  //   const offline$ = fromEvent(window, 'offline').pipe(
  //     map(() => 'offline'),
  //     debounceTime(100),
  //     distinctUntilChanged()
  //   );

  //   this.connectionStatus$ = merge(online$, offline$).pipe(
  //     share(),
  //     catchError((error) => {
  //       console.error('Error detecting connection status:', error);
  //       return of(this.connectionStatus);
  //     })
  //   );

  //   return this.connectionStatus$.subscribe((status: string) => {
  //     const Toast = Swal.mixin({
  //       toast: true,
  //       position: 'top-end',
  //       showConfirmButton: false,
  //       timer: 3000,
  //       timerProgressBar: true,
  //       didOpen: (toast) => {
  //         toast.onmouseenter = Swal.stopTimer;
  //         toast.onmouseleave = Swal.resumeTimer;
  //       },
  //     });
  //     Toast.fire({
  //       icon: 'info',
  //       title: `${status}`,
  //     });

  //     console.log({ fromService: status });

  //     this.connectionStatus = status;

  //     if (status === 'online') {
  //       this.valeSrv.revisarVales(); // Llama a la función revisarVales() del servicio ValeService
  //     }
  //   });
  // };

  public isOnline = () => {
    this.connection = merge(
      fromEvent(window, 'online').pipe(map(() => 'online')),
      fromEvent(window, 'offline').pipe(map(() => 'offline'))
    )
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
        tap((status) => {
          console.log(`El estado de conexión es: ${status}`);
          this.status = status;
        }),
        catchError((error) => {
          console.error('Error de conexión:', error);
          return [];
        }),
        share()
      )
      .subscribe((status) => {
        if (status === 'online') {
          this.valeSrv.revisarVales();
        }

        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: 'info',
          title: `${status}`,
        });
      });
  };

  // getConnectionStatus(): string {
  //   return this.connectionStatus;
  // }

  // getConnectionStatus$(): Observable<string> {
  //   return this.connectionStatus$;
  // }
}
