import { Component, OnInit } from '@angular/core';
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
  templateUrl: './carga.component.html',
  styleUrl: './carga.component.sass',
})
export class CargaComponent implements OnInit {
  public showModal: string = 'none';

  public isCargaActual: boolean = false;

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
        this.isCargaActual = carga.length > 0;
      },
      error: (err) => {
        this.isCargaActual = false;
      },
    });
  }

  generarCodigoAleatorio = (): string => {
    const codigo = Math.floor(100 + Math.random() * 900);
    return codigo.toString().concat(DateTime.now().toFormat('ssSSS'));
  };

  printCarga = () => {
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
          font-size: 16px;
          font-weight: 300;
        }
        
        .cabecera {
          padding-top: 20px;
        
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: stretch;
          gap: 4px;

          font-size: 12px;
          font-weight: 300;
        }
        
        .cuerpo {
          padding: 20px 0;
        
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: stretch;

          font-size: 12px;
          font-weight: 300;
        }
        
        .cuerpo .separador {
          margin-bottom: 4px;
          font-size: 14px;
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
          font-size: 14px;
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
          font-size: 12px;
          font-weight: 300;
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
