import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import Dexie from 'dexie';

import {
  IActiveUsersResponse,
  IShortUser,
  IUserToVerify,
  IValidateUserResponse,
} from '../../models';
import { DbService } from '../db';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userData: IShortUser | null = null;

  private db!: Dexie;


  constructor(
    private http: HttpClient, 
    private dbSrv: DbService
    ) {
    this.db = this.dbSrv.getDataBase();
  }

  getAllActiveUsers = (): Observable<IActiveUsersResponse> => {
    return this.http.get<IActiveUsersResponse>(
      environment.apiUrl.concat('/user/AllActiveUsers')
    );
  };

  validateUser = (
    usuario: IUserToVerify
  ): Observable<IValidateUserResponse> => {
    return this.http.post<IValidateUserResponse>(
      environment.apiUrl.concat('/user/ValidateUser'),
      usuario
    );
  };

  validateUserOnIndexDB = async (usuario: IUserToVerify): Promise<boolean> => {
    let isUsuario: boolean = false;

    await this.dbSrv.getOneUser(usuario).then((res) => {
      if (res) {
        isUsuario = true;

        this.setUserOnLocalStorage({
          Id: res.Id,
          Apellido: res.Apellido,
          Nombre: res.Nombre,
          Habilitado: res.Habilitado,
          Usuario: res.Usuario,
        });
      } else {
        isUsuario = false;
      }
    });

    return isUsuario;
  };

  synchronizeUsers = (): void => {};

  setUserOnLocalStorage = (usuario: IShortUser): void => {
    this.userData = usuario;
    localStorage.setItem('usuario', JSON.stringify(usuario));
  };

  clearUserOnLocalStorage = (): void => localStorage.removeItem('usuario');

  getDataUserOnLocalStorage = (): IShortUser | null => {
    if (!this.userData && localStorage.getItem('usuario'))
      this.userData = JSON.parse(localStorage.getItem('usuario')!);

    return this.userData ? this.userData : null;
  };
}
