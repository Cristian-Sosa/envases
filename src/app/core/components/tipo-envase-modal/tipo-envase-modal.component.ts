import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { ButtonComponent } from '../../../shared';
import { InputRadioComponent } from '../../../shared/components/input-radio/input-radio.component';
import { EnvasesService } from '../../../shared/services/envases/envases.service';

@Component({
  selector: 'app-tipo-envase-modal',
  standalone: true,
  imports: [
    InputRadioComponent,
    ButtonComponent,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './tipo-envase-modal.component.html',
  styleUrl: './tipo-envase-modal.component.sass',
})
export class TipoEnvaseModalComponent implements OnInit {
  public tiposEnvase: any[] = [];

  @Output() tipoSeleccionado: EventEmitter<number> = new EventEmitter();

  tipoEnvaseForm = new FormGroup({
    envaseControl: new FormControl(null, [
      Validators.required,
      Validators.nullValidator,
    ]),
  });

  constructor(private envaseSrv: EnvasesService) {}

  ngOnInit(): void {
    this.envaseSrv
      .getAllTipoEnvases()
      .then((promiseRes) => {
        promiseRes.map((envase) => {
          let envaseTemp: any = {
            id: envase.id,
            title: this.CapitailzeString(envase.nombre),
            name: envase.nombre,
          };
          this.tiposEnvase.push(envaseTemp);
        });
      })
      .catch((err) => {
        Swal.fire({
          title: '¡Vaya! Algo salió mal',
          text: 'Hubo un error obteniendo los tipos de envases, intenta reiniciar la aplicación. /n Si el problema persiste comunicate con sistemas',
          icon: 'error',
          confirmButtonText: 'Entendido',
        });
      });
  }

  CapitailzeString(texto: string): string {
    if (texto.length === 0) return texto;

    return texto.charAt(0).toUpperCase() + texto.slice(1);
  }

  forwardProcess = (): void => {
    const envase: string | number =
      this.tipoEnvaseForm.controls['envaseControl'].value!;

    if (!envase) {
      Swal.fire({
        title: 'Debes seleccionar un tipo de envase',
        text: 'Puede que hayas cometido un error o tu usuario se encuentre suspendido.',
        icon: 'error',
        confirmButtonText: 'Reintentar',
      });
    } else {
      this.tipoSeleccionado.emit(parseInt(envase));
    }
  };

  returnProcess = (): void => this.tipoSeleccionado.emit(0);
}
