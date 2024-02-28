import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EnvasesService } from '../../../shared/services/envases/envases.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  ButtonComponent,
  InputComponent,
  SelectComponent,
} from '../../../shared';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cantidad-envase-modal',
  standalone: true,
  imports: [
    SelectComponent,
    InputComponent,
    ButtonComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './cantidad-envase-modal.component.html',
  styleUrl: './cantidad-envase-modal.component.sass',
})
export class CantidadEnvaseModalComponent implements OnInit {
  constructor(private envaseSrv: EnvasesService) {}

  public envases: any = [];

  @Output() cantidadEnvase: EventEmitter<
    { envaseId: number; cantidad: number } | 0
  > = new EventEmitter();

  @Input() tipoEnvaseId: number | null = null;

  tipoEnvaseForm = new FormGroup({
    tipoControl: new FormControl('', [
      Validators.required,
      Validators.nullValidator,
    ]),
    cantidadControl: new FormControl('', [
      Validators.required,
      Validators.nullValidator,
      Validators.min(1),
      Validators.max(5000),
    ]),
  });

  ngOnInit(): void {
    this.envaseSrv
      .getAllEnvases()
      .then((envasesArr) => {
        envasesArr.map((envase) => {
          if (envase.TipoEnvaseId === this.tipoEnvaseId) {
            let envaseTemp: { value: number; description: string } = {
              value: envase.Id,
              description: this.capitalizarTexto(envase.Descripcion),
            };

            this.envases.push(envaseTemp);
          }
        });
      })
      .then(() => {
        this.tipoEnvaseForm.controls['tipoControl'].setValue(
          this.envases[0].value.toString()
        );
      })
      .catch((err) => {
        Swal.fire({
          title: '¡Vaya! Algo salió mal',
          text: 'Hubo un error obteniendo los envases, intenta reiniciar la aplicación. /n Si el problema persiste comunicate con sistemas',
          icon: 'error',
          confirmButtonText: 'Entendido',
        });
      });
  }

  capitalizarTexto(texto: string): string {
    if (texto.length === 0) return texto;

    return texto.charAt(0).toUpperCase() + texto.slice(1);
  }

  returnProcess = (): void => this.cantidadEnvase.emit(0);

  forwardProcess = (): void => {
    let envase: string | null =
      this.tipoEnvaseForm.controls['tipoControl'].value;
    let cantidad: string | null =
      this.tipoEnvaseForm.controls['cantidadControl'].value;

    if (!cantidad || !/^\d+$/.test(cantidad)) {
      Swal.fire({
        title: '¡No puedes hacer eso!',
        text: 'Para avanzar necesitas agregar una cantidad válida. Debe ser entero y positivo.2222',
        icon: 'error',
        confirmButtonText: 'Entendido',
      });
    } else {
      let obj: { envaseId: number; cantidad: number } = {
        envaseId: parseInt(envase!),
        cantidad: parseInt(cantidad!),
      };

      this.cantidadEnvase.emit(obj);
    }
  };
}
