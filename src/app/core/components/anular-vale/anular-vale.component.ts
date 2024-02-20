import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent, ButtonComponent } from '../../../shared/components';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService, EnvasesService, ValeService } from '../../../shared/services';

@Component({
  selector: 'app-anular-vale',
  standalone: true,
  imports: [InputComponent, ButtonComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './anular-vale.component.html',
  styleUrl: './anular-vale.component.sass',
})
export class AnularValeComponent {
  constructor(
    private router: Router,
    private valeSrv: ValeService,
    private envaseSrv: EnvasesService,
    private authSrv: AuthService
  ) {}

  valeForm = new FormGroup({
    valeControl: new FormControl('', [
      Validators.required,
      Validators.nullValidator,
    ]),
  });

  returnProcess = (): void => {
    this.router.navigate(['carga']);
  };

  forwardProcess = (): void => {
    let nroVale: FormControl<string | null> =
      this.valeForm.controls['valeControl'];

    if (nroVale.errors) {
      Swal.fire({
        title: 'Algo no está bien',
        text: 'Revisá nuevamente el número de vale',
        icon: 'warning',
        confirmButtonText: 'Ir a revisar',
      });
    } else {
      let usuario: string = this.authSrv.getDataUserOnLocalStorage()?.Usuario!
      this.valeSrv.anularVale(nroVale.value!, usuario).subscribe({
        next: (res) => {
          Swal.fire({
            title: 'Vale anulado',
            text: `Se anuló correctamente el vale número ${nroVale}`,
            icon: 'success',
            confirmButtonText: 'Continuar',
          }).then(() => {
            this.envaseSrv.resetVale();
            this.router.navigate(['carga']);
          });
        },
        error: (err) => {
          Swal.fire({
            title: 'Hubo un error',
            text: 'No se pudo anular el vale, revisá la conexión a internet e intenta nuevamente',
            icon: 'error',
            confirmButtonText: 'Volver a intentar',
          });
        },
      });
    }
  };
}
