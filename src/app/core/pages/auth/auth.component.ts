import { Component, OnInit, Pipe } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import {
  ButtonComponent,
  IUserToVerify,
  InputComponent,
} from '../../../shared';

import Swal from 'sweetalert2';
import {
  AuthService,
  WebConnectionService,
} from '../../../shared/services';
import { HttpClientModule } from '@angular/common/http';
import { Observable, map, pipe, take } from 'rxjs';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    InputComponent,
    ButtonComponent,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.sass',
})
export class AuthComponent {
  authForm = new FormGroup({
    userControl: new FormControl('', [
      Validators.required,
      Validators.nullValidator,
    ]),
    passControl: new FormControl('', [
      Validators.required,
      Validators.nullValidator,
    ]),
  });
  valeSrv: any;

  constructor(
    private router: Router,
    private authSrv: AuthService,
  ) {}

  submitForm = () => {
    let usuario: IUserToVerify = {
      Username: this.authForm.get('userControl')?.value!,
      Password: this.authForm.get('passControl')?.value!,
    };

    this.authSrv
      .validateUser(usuario)
      .pipe(take(2))
      .subscribe({
        next: (res) => {
          this.authSrv.setUserOnLocalStorage(res);
          this.router.navigate(['carga']);
        },
        error: (err) => {
          this.authSrv.validateUserOnIndexDB(usuario).then((isUser) => {
            if (isUser) {
              this.router.navigate(['carga']);
            } else {
              Swal.fire({
                title: 'Usuario no registrado',
                text: 'Puede que hayas cometido un error o tu usuario se encuentre suspendido.',
                icon: 'error',
                confirmButtonText: 'Reintentar',
              });
            }
          });
        },
      });
  };
}
function fromEvent(window: Window & typeof globalThis, arg1: string) {
  throw new Error('Function not implemented.');
}

function debounceTime(arg0: number): any {
  throw new Error('Function not implemented.');
}

function distinctUntilChanged(): any {
  throw new Error('Function not implemented.');
}

function merge(online$: any, offline$: any) {
  throw new Error('Function not implemented.');
}

function share(): any {
  throw new Error('Function not implemented.');
}

function catchError(arg0: (error: any) => any): any {
  throw new Error('Function not implemented.');
}

function of(connectionStatus: string) {
  throw new Error('Function not implemented.');
}

