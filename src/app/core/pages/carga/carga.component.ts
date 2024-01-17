import { Component } from '@angular/core';
import { DateTime } from 'luxon';

import { EnvasesService } from '../../../shared/services';
import { ButtonComponent } from '../../../shared';
import {
  CantidadEnvaseModalComponent,
  ListaEnvasesComponent,
  TicketLayoutComponent,
  TipoEnvaseModalComponent,
} from '../../components';
import { AuthService } from '../../../shared/services';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-carga',
  standalone: true,
  imports: [
    ButtonComponent,
    CantidadEnvaseModalComponent,
    TipoEnvaseModalComponent,
    ListaEnvasesComponent,
    TicketLayoutComponent,
    NgIf,
  ],
  providers: [EnvasesService, AuthService],
  templateUrl: './carga.component.html',
  styleUrl: './carga.component.sass',
})
export class CargaComponent {
  public showModal: string = 'none';

  public datos: {
    fecha: string;
    usuario: string | undefined;
    ticket: string;
  };

  public envaseDTO: {
    envaseId: number | null;
    tipoEnvaseId: number | null;
    cantidad: number | null;
  } = {
    envaseId: null,
    tipoEnvaseId: null,
    cantidad: null,
  };

  constructor(private authSrv: AuthService, private envaseSrv: EnvasesService) {
    this.datos = {
      fecha: DateTime.now().toFormat('LLL dd/MM/yyyy, hh:mm:ss'),
      usuario: this.authSrv.getDataUserOnLocalStorage()?.Nombre,
      ticket: this.generarCodigoAleatorio(),
    };
  }

  generarCodigoAleatorio = (): string => {
    const codigo = Math.floor(100 + Math.random() * 900);
    return codigo.toString().concat(DateTime.now().toFormat('ssSSS'));
  };

  printCarga = () => {
    this.datos = {
      fecha: DateTime.now().toFormat('LLL dd/MM/yyyy, hh:mm').toUpperCase(),
      usuario: this.authSrv.getDataUserOnLocalStorage()?.Nombre,
      ticket: this.generarCodigoAleatorio(),
    };

    // this.valeService.sendVale(this.datos.ticket).subscribe({
    //   next: (res) => {
    //     console.log(res);
    //     this.valeService.setEan(res.barcode.CodBarra1);
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   },
    // });

    const printWindow = window.open('', '_blank');

    printWindow!.document.write(`<html>
    <head>
      <title>Vale de envases - preview</title>
      <style type="text/css">
      * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
          color: #000;
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
          width: 100%;
          margin-bottom: 8px;
          object-fit: container;
        }

        .ticket_header .title {
          margin-bottom: 2px;
          font-size: 14px;
        }
        
        .ticket_header .sub-title {
          font-size: 10px;
          font-weight: 500;
        }
        
        .cabecera {
          padding-top: 16px;
        
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: stretch;
          gap: 2px;

          font-size: 8px;
          font-weight: 500;
        }
        
        .cuerpo {
          padding: 16px 0;
        
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: stretch;

          font-size: 10px;
          font-weight: 500;
        }
        
        .cuerpo .separador {
          margin-bottom: 8px;
          font-size: 8px;
        }
        
        .card {        
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: strech;
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
          margin-top: 8px;

          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        }
        
        .footer-firma {
          width: 80%;
        
          margin: 32px auto 0;
        
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
          font-size: 8px;
        }

        main svg {
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
  };

  newEnvase = (): void => {
    this.showModal = 'tipoEnvase';
  };

  tipoEnvaseSelected = (tipoEnvaseId: number): void => {
    if (tipoEnvaseId !== 0) {
      this.envaseDTO.tipoEnvaseId = parseInt(tipoEnvaseId.toString()!);
      this.showModal = 'cantidadEnvases';
    } else {
      this.showModal = 'none';
    }
  };

  cantidadEnvaseSelected = (
    obj: { envaseId: number; cantidad: number } | 0
  ): void => {
    if (obj !== 0) {
      this.envaseDTO.envaseId = obj.envaseId;
      this.envaseDTO.cantidad = obj.cantidad;
      this.envaseSrv.cargarEnvase(this.envaseDTO);
      this.showModal = 'none';
    } else {
      this.showModal = 'tipoEnvase';
    }
  };
}
