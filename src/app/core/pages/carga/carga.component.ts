import { Component, OnInit } from '@angular/core';
import { DateTime } from 'luxon';

import {
  EnvasesService,
  ValeService,
  WebConnectionService,
} from '../../../shared/services';
import { ButtonComponent, Envase, IVale } from '../../../shared';
import {
  AnularValeComponent,
  CantidadEnvaseModalComponent,
  ListaEnvasesComponent,
  TicketLayoutComponent,
  TipoEnvaseModalComponent,
} from '../../components';
import { AuthService } from '../../../shared/services';
import { NgIf } from '@angular/common';

import Swal from 'sweetalert2';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-carga',
  standalone: true,
  imports: [
    ButtonComponent,
    CantidadEnvaseModalComponent,
    TipoEnvaseModalComponent,
    ListaEnvasesComponent,
    TicketLayoutComponent,
    AnularValeComponent,
    NgIf,
    RouterOutlet,
  ],
  templateUrl: './carga.component.html',
  styleUrl: './carga.component.sass',
})
export class CargaComponent implements OnInit {
  public showModal: string = 'none';

  public isCargaActual: boolean = false;
  private carga: Envase[] = [];

  public datos: {
    fecha: string;
    usuario: string | undefined;
    ticket: string;
  };

  public envaseDTO: {
    EnvaseId: number | null;
    TipoEnvaseId: number | null;
    Cantidad: number | null;
  } = {
    EnvaseId: null,
    TipoEnvaseId: null,
    Cantidad: null,
  };

  constructor(
    private authSrv: AuthService,
    private envaseSrv: EnvasesService,
    private valeSrv: ValeService,
    private webConectionSrv: WebConnectionService
  ) {
    let currentDate = new Date();

    let formattedDate = currentDate.toLocaleString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    });

    this.datos = {
      fecha: formattedDate.toUpperCase(),
      usuario: this.authSrv.getDataUserOnLocalStorage()?.Nombre,
      ticket: this.generarCodigoAleatorio(),
    };
  }
  ngOnInit(): void {
    this.envaseSrv.getCargaEnvasesObservable().subscribe({
      next: (carga) => {
        this.carga = carga;
        this.isCargaActual = carga.length > 0;
      },
      error: (err) => {
        this.isCargaActual = false;
      },
    });

    this.webConectionSrv.isOnline();
  }

  generarCodigoAleatorio = (): string => {
    const codigo = Math.floor(100 + Math.random() * 900);
    return codigo.toString().concat(DateTime.now().toFormat('ssSSS'));
  };

  printCarga = () => {
    let currentDate = new Date();

    let formattedDate = currentDate.toLocaleString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    });

    this.datos = {
      fecha: formattedDate.toUpperCase(),
      usuario: this.authSrv.getDataUserOnLocalStorage()?.usuario,
      ticket: this.generarCodigoAleatorio(),
    };

    this.valeSrv
      .sendVale(this.datos.ticket)
      .subscribe({
        next: (res) => {
          this.valeSrv.setEan(res.EAN || res.ean);

          Swal.fire({
            title: 'Vale registrado',
            text: 'El vale se guardó correctamente, no necesitarás subirlo luego.',
            icon: 'success',
            confirmButtonText: 'Continuar',
          });
        },
        error: (res) => {
          const printWindow = window.open('', '_blank');

          printWindow!.document.write(`<html>
      <head>
        <title>Vale de envases - preview</title>
        <style type="text/css">
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            color: #000;
            font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
          }
          
          body {
            width: 100%;
            height: auto;
          }
          
          .ticket_header {  
            padding: 24px 0 8px;
            
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
          }
  
          .ticket_header .logo {
            width: 90%;
            margin-bottom: 16px;
            object-fit: container;
          }
  
          .ticket_header .title, .ticket_header .sub-title {
            margin-bottom: 4px;
            font-size: 12px;
            font-weight: 400;
          }
          
          .cabecera {
            padding-top: 20px;
          
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: stretch;
            gap: 4px;
  
            font-size: 10px;
            font-weight: 400;
          }
          
          .cuerpo {
            padding: 20px 0;
          
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: stretch;
  
            font-size: 10px;
            font-weight: 400;
          }
          
          .cuerpo .separador {
            margin-bottom: 4px;
            font-size: 10px;
          }
          
          .card {        
            width: 100%;
            margin: 2px 0;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: strech;
          }
  
          .card .card_header .envase, .card .card_header .unidades {        
            font-size: 10px;
          }
  
          .card_header {     
            width: 100%;
  
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }
          
          .footer {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
          }
          
          .firma-container {
            width: 100%;
            margin-top: 10px;
  
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }
          
          .footer-firma {
            width: 80%;
          
            margin: 42px auto 0;
          
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          
            border-top: 1px solid #000;
          }
          
          .footer-firma.caja {
            width: 40%;
          }
          
          .footer-firma p {
            margin-top: 4px;
            text-align: center;
            font-size: 10px;
            font-weight: 400;
          }
  
          main svg {
            width: 100%;
            margin: 8px auto 16px;
          }
        </style>
      </head>
            <body>`);

          printWindow!.document.write(
            document.querySelector('#ticketPrintComponent')?.innerHTML!
          );

          printWindow!.document.write(`</body></html>`);

          printWindow!.document.close();
          printWindow!.print();

          this.envaseSrv.resetVale();

          let valeConError: IVale = {
            ValeNro: this.datos.ticket,
            Sucursal: this.datos.usuario?.toUpperCase()!,
            Items: this.carga,
          };

          this.valeSrv.guardarVale(valeConError);

          Swal.fire({
            title: 'El vale no se registró',
            text: 'Hubo un error de conexión, guardaremos el vale y podrás subirlo más tarde.',
            icon: 'warning',
            confirmButtonText: 'Continuar',
          });
        },
        complete: () => {
          const printWindow = window.open('', '_blank');

          printWindow!.document.write(`<html>
      <head>
        <title>Vale de envases - preview</title>
        <style type="text/css">
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            color: #000;
            font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
          }
          
          body {
            width: 100%;
            height: auto;
          }
          
          .ticket_header {  
            padding: 24px 0 8px;
            
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
          }
  
          .ticket_header .logo {
            width: 90%;
            margin-bottom: 16px;
            object-fit: container;
          }
  
          .ticket_header .title, .ticket_header .sub-title {
            margin-bottom: 4px;
            font-size: 12px;
            font-weight: 400;
          }
          
          .cabecera {
            padding-top: 20px;
          
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: stretch;
            gap: 4px;
  
            font-size: 10px;
            font-weight: 400;
          }
          
          .cuerpo {
            padding: 20px 0;
          
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: stretch;
  
            font-size: 10px;
            font-weight: 400;
          }
          
          .cuerpo .separador {
            margin-bottom: 4px;
            font-size: 10px;
          }
          
          .card {        
            width: 100%;
            margin: 2px 0;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: strech;
          }
  
          .card .card_header .envase, .card .card_header .unidades {        
            font-size: 10px;
          }
  
          .card_header {     
            width: 100%;
  
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }
          
          .footer {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
          }
          
          .firma-container {
            width: 100%;
            margin-top: 10px;
  
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }
          
          .footer-firma {
            width: 80%;
          
            margin: 42px auto 0;
          
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          
            border-top: 1px solid #000;
          }
          
          .footer-firma.caja {
            width: 40%;
          }
          
          .footer-firma p {
            margin-top: 4px;
            text-align: center;
            font-size: 10px;
            font-weight: 400;
          }
  
          main svg {
            width: 100%;
            margin: 8px auto 16px;
          }
        </style>
      </head>
            <body>`);

          printWindow!.document.write(
            document.querySelector('#ticketPrintComponent')?.innerHTML!
          );

          printWindow!.document.write(`</body></html>`);

          printWindow!.document.close();
          printWindow!.print();

          this.envaseSrv.resetVale();
        },
      })
      .add(() => this.valeSrv.setEan(''));
  };

  newEnvase = (): void => {
    this.showModal = 'tipoEnvase';
  };

  tipoEnvaseSelected = (tipoEnvaseId: number): void => {
    if (tipoEnvaseId !== 0) {
      this.envaseDTO.TipoEnvaseId = parseInt(tipoEnvaseId.toString()!);
      this.showModal = 'cantidadEnvases';
    } else {
      this.showModal = 'none';
    }
  };

  cantidadEnvaseSelected = (
    obj: { envaseId: number; cantidad: number } | 0
  ): void => {
    if (obj !== 0) {
      this.envaseDTO.EnvaseId = obj.envaseId;
      this.envaseDTO.Cantidad = obj.cantidad;
      this.envaseSrv.cargarEnvase(this.envaseDTO);
      this.showModal = 'none';
    } else {
      this.showModal = 'tipoEnvase';
    }
  };
}
