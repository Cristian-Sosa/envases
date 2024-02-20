import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ValeService, EnvasesService, AuthService } from '../../../shared/services';
import { InputComponent, ButtonComponent } from '../../../shared';

@Component({
  selector: 'app-reimprimir-vale',
  standalone: true,
  imports: [InputComponent, ButtonComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './reimprimir-vale.component.html',
  styleUrl: './reimprimir-vale.component.sass',
})
export class ReimprimirValeComponent {
  constructor(
    private router: Router,
    private valeSrv: ValeService,
    private envaseSrv: EnvasesService,
    private AuthSrv: AuthService
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
      let usuario: string = this.AuthSrv.getDataUserOnLocalStorage()?.Usuario!
      this.valeSrv.anularVale(nroVale.value!, usuario).subscribe({
        next: (res) => {
          Swal.fire({
            title: 'Vale reimpreso',
            text: `Se volvió a imprimir el vale N° ${nroVale}`,
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
            text: 'No se pudo reimprimir el vale, revisá la conexión a internet e intenta nuevamente',
            icon: 'error',
            confirmButtonText: 'Volver a intentar',
          });
        },
      });
    }
  };
}
