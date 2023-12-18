import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { ButtonComponent, InputComponent } from '../../../shared';

import Swal from 'sweetalert2';
import { AuthService } from '../../../shared/services';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [HttpClientModule ,FormsModule, ReactiveFormsModule, InputComponent, ButtonComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.sass',
  providers: [AuthService]
})
export class AuthComponent implements OnInit {
  constructor(private router: Router, private authSrv: AuthService) {}

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

  ngOnInit(): void {
    this.authSrv.getAllUsers().then((users) => {
      console.log(users);
    });
  }

  submitForm = () => {
    let usuario: any = {
      Usuario: this.authForm.get('userControl')?.value!,
      Password: this.authForm.get('passControl')?.value!,
    };

    let isUserRegistered!: boolean;

    Swal.fire({
      title: 'Usuario no registrado',
      text: 'Puede que hayas cometido un error o tu usuario se encuentre suspendido.',
      icon: 'error',
      confirmButtonText: 'Reintentar',
    }).then(() => {
      this.authForm.reset();
    });

    // this.authService
    //   .validateUser(usuario)
    //   .pipe(take(1))
    //   .subscribe({
    //     next: (res) => {
    //       if (res.status === 200) {
    //         isUserRegistered = true;
    //         console.log(res.data)
    //         this.authService.setUsuario(res.data);
    //       } else {
    //         isUserRegistered = false;
    //       }
    //     },
    //     error: (err) => {
    //       if (err.error.mensaje === 'Usuario no encontrado') {
    //         isUserRegistered = false;
    //       } else if (err.error.mensaje.includes('son obligatorios')) {
    //         this.toastService.setToastState('Campos vacíos o inválidos');
    //       } else {
    //         isUserRegistered = this.authService.userValidation(usuario);
    //       }
    //     },
    //   })
    //   .add(() => {
    //     if (isUserRegistered) {
    //       this.router.navigate(['carga']);
    //     } else {
    //       this.toastService.setToastState('El usuario no existe');
    //     }
    //   });
  };
}
