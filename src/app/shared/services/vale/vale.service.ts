import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from '../../../../environments/environment.development';

import { IVale, IShortUser, IAddValeResponse } from '../../models';
import { AuthService } from '../auth';
import { EnvasesService } from '../envases';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ValeService {
  constructor(
    private authSrv: AuthService,
    private envaseSrv: EnvasesService,
    private http: HttpClient
  ) {}

  private vale: IVale = {
    sucursal: 'AV',
    valeNro: '',
    items: [],
  };

  private ean: BehaviorSubject<string> = new BehaviorSubject('');

  sendVale = (nroVale: string, step: boolean = false): Observable<IAddValeResponse> => {
    this.vale.valeNro = nroVale;

    if (!step) {
      this.cargarVale();
    }

    return this.http.post<IAddValeResponse>(environment.apiUrl.concat('Vale/Add'), {
      carga: this.vale,
    });
  };

  anularVale = (nroVale: string): Observable<any> => {
    return this.http.patch(environment.apiUrl.concat('/vale/AnularVale'), {
      nroVale: nroVale,
    });
  };

  cargarVale = (): void => {
    this.obtenerUsuario();
    this.obtenerItemsVale();
  };

  obtenerUsuario = (): void => {
    const usuario: IShortUser | null = this.authSrv.getDataUserOnLocalStorage();

    if (!usuario) {
      Swal.fire({
        title: '¡Vaya! No encontramos tu usuario',
        text: 'Tendras que iniciar sesión nuevamente',
        icon: 'error',
        confirmButtonText: 'Entendido',
      });
    } else {
      this.vale.sucursal = usuario.Usuario;
    }
  };

  obtenerItemsVale = (): void => {
    this.envaseSrv.getCargaEnvases().then((envases) => {
      if (!envases) {
        Swal.fire({
          title: '¡Vaya! Algo salió mal',
          text: 'No pudimos recuperar la carga que estabas subiendo',
          icon: 'error',
          confirmButtonText: 'Entendido',
        });
      } else {
        this.vale.items = envases;
      }
    });
  };

  guardarVale = (vale: IVale): void => {
    let isValesPendientes: string | null =
      localStorage.getItem('vales_pendientes');

    let vales: IVale[] = [];

    if (isValesPendientes !== null) {
      vales = JSON.parse(isValesPendientes!);
    }

    vales.push(vale);
    localStorage.setItem('vales_pendientes', JSON.stringify(vales));
  };

  revisarVales = async () => {
    let cargasString: string | null = localStorage.getItem('vales_pendientes');

    if (cargasString) {
      let valesPendientes: IVale[] = JSON.parse(cargasString);

      for (let i = 0; i < valesPendientes.length; i++) {
        const vale: IVale = valesPendientes[i];

        this.vale = vale;

        this.sendVale(vale.valeNro, true)
          .subscribe({
            next: (res) => {
              console.log(`El vale ${vale.valeNro} fue subido correctamente`);
            },
            error: (err) => {
              console.error(`El vale ${vale.valeNro} no pudo ser subido`);
            },
          })
          .unsubscribe();
      }
    }
  };

  setEan = (newEan: string): void => {
    this.ean.next(newEan);
    console.log(newEan);
  };

  getEAN = (): Observable<string> => {
    return this.ean.asObservable();
  };
}
