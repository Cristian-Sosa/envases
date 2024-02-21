import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from '../../../../environments/environment.development';

import { IVale, IShortUser, IAddValeResponse, Envase } from '../../models';
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

  private modelo: IVale = {
    Sucursal: 'AV',
    ValeNro: '',
    Items: [],
  };

  private ean: BehaviorSubject<string> = new BehaviorSubject('');

  sendVale = (nroVale: string): Observable<IAddValeResponse | any> => {
    this.modelo.ValeNro = nroVale;

    this.cargarVale();

    console.log({ vale: this.modelo });

    return this.http.post<IAddValeResponse>(
      environment.apiUrl.concat('Vale/Add'),
      this.modelo
    );
  };

  anularVale = (nroVale: string, sucursal: string): Observable<boolean> => {
    return this.http.post<boolean>(environment.apiUrl.concat(`Vale/Anular?NroVale=${nroVale}&Username=${sucursal}`), null);
  };

  cargarVale = (): void => {
    this.obtenerUsuario();
    this.obtenerItemsVale();
  };

  obtenerUsuario = (): void => {
    const usuario: any = this.authSrv.getDataUserOnLocalStorage();

    if (!usuario) {
      Swal.fire({
        title: '¡Vaya! No encontramos tu usuario',
        text: 'Tendras que iniciar sesión nuevamente',
        icon: 'error',
        confirmButtonText: 'Entendido',
      });
    } else {
      this.modelo.Sucursal = usuario.usuario;
    }
  };

  obtenerItemsVale = (): void => {
    this.modelo.Items = this.envaseSrv.getCargaEnvases();
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

    // if (cargasString) {
    //   let valesPendientes: IVale[] = JSON.parse(cargasString);

    //   for (let i = 0; i < valesPendientes.length; i++) {
    //     const vale: IVale = valesPendientes[i];

    //     this.vale = vale;

    //     this.sendVale(vale.ValeNro)
    //       .subscribe({
    //         next: (res) => {
    //           console.log(`El vale ${vale.ValeNro} fue subido correctamente`);
    //         },
    //         error: (err) => {
    //           console.error(`El vale ${vale.ValeNro} no pudo ser subido`);
    //         },
    //       })
    //       .unsubscribe();
    //   }
    // }
  };

  setEan = (newEan: string): void => {
    this.ean.next(newEan);
    console.log({ EAN: newEan });
  };

  getEAN = (): Observable<string> => {
    return this.ean.asObservable();
  };
}
