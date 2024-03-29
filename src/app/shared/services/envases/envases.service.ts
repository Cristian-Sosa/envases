import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Envase, EnvaseDTO, TipoEnvase } from '../../models';
import { DbService } from '../db';

import Swal from 'sweetalert2';
import Dexie from 'dexie';

@Injectable({
  providedIn: 'root',
})
export class EnvasesService {
  private cargaEnvases: Envase[] = [];
  private _cargaEnvases: BehaviorSubject<Envase[]> = new BehaviorSubject(
    this.cargaEnvases
  );

  private envases: Envase[] = [];

  private db: Dexie;

  constructor(private dbSrv: DbService) {
    this.db = this.dbSrv.getDataBase();
    this._cargaEnvases.next([]);
  }

  getAllTipoEnvases = async (): Promise<TipoEnvase[]> => {
    const tipoEnvases = await this.dbSrv.getTipoEnvases();

    return tipoEnvases;
  };

  getAllEnvases = async (): Promise<Envase[]> => {
    const envases = await this.dbSrv.getEnvases();

    return envases;
  };

  getFilteredEnvases = async (tipoEnvaseId: string): Promise<Envase[]> =>
    this.dbSrv.getOneEnvase(tipoEnvaseId);

  getCargaEnvases = (): Envase[] => {
    return this.cargaEnvases;
  };

  getCargaEnvasesObservable = (): Observable<Envase[]> => {
    if (this.cargaEnvases && localStorage.getItem('carga_actual')) {
      this.cargaEnvases = JSON.parse(localStorage.getItem('carga_actual')!);
      this._cargaEnvases.next(this.cargaEnvases);
    }

    return this._cargaEnvases.asObservable();
  };

  addEnvase = (envase: Envase): void => {
    this.cargaEnvases.push(envase);
    this._cargaEnvases.next(this.cargaEnvases);
    localStorage.setItem('carga_actual', JSON.stringify(this.cargaEnvases));
  };

  cargarEnvase = async (envaseDTO: EnvaseDTO) => {
    let envaseFiltrado!: Envase | undefined;
    let envaseTemp: Envase | null = null;

    let envases: Envase[];

    try {
      let envases = await this.getAllEnvases();

      envaseFiltrado = envases.find(
        (envase) => envase.Id === envaseDTO.EnvaseId!
      );

      if (envaseFiltrado) {
        envaseFiltrado.Cantidades = envaseDTO.Cantidad!;
        this.addEnvase(envaseFiltrado);
      } else {
        Swal.fire({
          title: '¡Vaya! Algo salió mal',
          text: 'Hubo un error obteniendo cargando el Envase, si el problema sigue comunicar a Sistemas - Desarrollo',
          icon: 'error',
          confirmButtonText: 'Entendido',
        });
      }
    } catch (err) {
      throw new Error('Error al cargar item de vale');
    }
  };

  removeEnvase = (envaseObj: any): void => {
    let index: number = -1; // * Inicializa el índice en -1 para verificar si se encontró una coincidencia

    for (let i = 0; i < this.cargaEnvases.length; i++) {
      const element = this.cargaEnvases[i];
      if (
        (element.Descripcion === envaseObj.Descripcion ||
          element.Descripcion === envaseObj.descripcion) &&
        (element.Id === envaseObj.Id || element.Id === envaseObj.id) &&
        (element.Cantidades === envaseObj.Cantidades ||
          element.Cantidades === envaseObj.cantidades)
      ) {
        index = i;
        break; // * Termina el bucle cuando se encuentra la coincidencia
      }
    }

    if (index !== -1) {
      this.cargaEnvases.splice(index, 1);
      this._cargaEnvases.next(this.cargaEnvases);

      localStorage.setItem('carga_actual', JSON.stringify(this.cargaEnvases));
    }
  };

  resetVale = (): void => {
    this.cargaEnvases = [];
    this._cargaEnvases.next(this.cargaEnvases);
    localStorage.setItem('carga_actual', JSON.stringify(this.cargaEnvases));
  };
}
