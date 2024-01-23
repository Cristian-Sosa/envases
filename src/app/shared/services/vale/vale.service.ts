import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from '../../../../environments/environment.development';

import { IVale, IShortUser } from '../../models';
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
    NombreSucursal: 'av',
    nroVale: '',
    items: [],
  };

  private ean: BehaviorSubject<string> = new BehaviorSubject('');

  sendVale = (nroVale: string): Observable<any> => {
    this.vale.nroVale = nroVale;

    this.cargarVale();

    return this.http.post<any>(environment.apiUrl.concat('/vale/AddVale'), {
      carga: this.vale,
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
      this.vale.NombreSucursal = usuario.Usuario;
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

  setEan = (newEan: string): void => {
    this.ean.next(newEan);
  };

  getEAN = (): Observable<string> => {
    return this.ean.asObservable();
  };
}
