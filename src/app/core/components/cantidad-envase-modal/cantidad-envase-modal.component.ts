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
      .then((envases) => {
        envases.map((envase) => {
          if (envase.tipoEnvaseID === this.tipoEnvaseId) {
            let envaseTemp: { value: number; description: string } = {
              value: envase.id,
              description: this.capitalizarTexto(envase.descripcion),
            };

            this.envases.push(envaseTemp);
          }
        });
      })
      .catch((err) => {
        Swal.fire({
          title: '¡Vaya! Algo salió mal',
          text: 'Hubo un error obteniendo los envases, intenta reiniciar la aplicación. /n Si el problema persiste comunicate con sistemas',
          icon: 'error',
          confirmButtonText: 'Entendido',
        });
      });

    this.tipoEnvaseForm.controls['tipoControl'].setValue(this.envases[0].value);
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

    if (!cantidad) {
      // TODO: Incorporar una alerta para cantidades inválidas
      Swal.fire({
        title: '¡No puedes hacer eso!',
        text: 'Para avanzar necesitas agregar una cantidad válida. /n Debe ser entero y positivo.',
        icon: 'error',
        confirmButtonText: 'Entendido',
      });
    } else {
      let obj: { envaseId: number; cantidad: number } = {
        envaseId: parseInt(envase!),
        cantidad: parseInt(cantidad),
      };

      this.cantidadEnvase.emit(obj);
    }
  };
}
