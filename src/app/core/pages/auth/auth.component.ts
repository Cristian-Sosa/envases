import { Component, OnInit } from '@angular/core';
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
  DbService,
  WebConectionService,
} from '../../../shared/services';
import { HttpClientModule } from '@angular/common/http';
import { take } from 'rxjs';

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
export class AuthComponent implements OnInit {
  private connectionStatus!: string;

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

  constructor(
    private router: Router,
    private authSrv: AuthService,
    private webConectionSrv: WebConectionService,
    private dbSrv: DbService
  ) {}

  ngOnInit(): void {
    this.connectionStatus = this.webConectionSrv.getConnectionStatus();

    this.webConectionSrv.getConnectionStatus$().subscribe((status: string) => {
      this.connectionStatus = status;
    });
  }

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
          // if (err.status !== 504) {
          //   Swal.fire({
          //     title: 'Usuario no registrado',
          //     text: 'Puede que hayas cometido un error o tu usuario se encuentre suspendido.',
          //     icon: 'error',
          //     confirmButtonText: 'Reintentar',
          //   }).then(() => {
          //     this.authForm.reset();
          //   });
          // } else {
          //   this.authSrv
          //     .validateUserOnIndexDB(usuario)
          //     .then((isUser) => {
          //       if (isUser) {
          //         this.router.navigate(['carga']);
          //       } else {
          //         Swal.fire({
          //           title: 'Usuario no registrado',
          //           text: 'Puede que hayas cometido un error o tu usuario se encuentre suspendido.',
          //           icon: 'error',
          //           confirmButtonText: 'Reintentar',
          //         });
          //       }
          //     })
          //     .catch((err) =>
          //       Swal.fire({
          //         title: err.message,
          //         text: 'Puede que hayas cometido un error o tu usuario se encuentre suspendido.',
          //         icon: 'error',
          //         confirmButtonText: 'Reintentar',
          //       })
          //     );
          // }
        },
      });
  };
}
