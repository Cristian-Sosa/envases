import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  IActiveUsersResponse,
  IFullUser,
  IShortUser,
  IUserToVerify,
  IValidateUserResponse,
} from '../../models';
import { environment } from '../../../../environments/environment.development';
import Dexie from 'dexie';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends Dexie {
  private usersDB: Dexie.Table<IFullUser, number>;

  private userData: IShortUser | null = null;

  private usuarios: IFullUser[] = [
    {
      Id: 1,
      DNI: '32960011',
      Nombre: 'Supermercado AV',
      Apellido: 'Supermercado AV',
      Usuario: 'AV',
      Password: '1234',
      Habilitado: true,
    },
    {
      Id: 2,
      DNI: '32960028',
      Nombre: 'Supermercado R20',
      Apellido: 'Supermercado R20',
      Usuario: 'R20',
      Password: '1234',
      Habilitado: true,
    },
    {
      Id: 3,
      DNI: '32960035',
      Nombre: 'Supermercado SV',
      Apellido: 'Supermercado SV',
      Usuario: 'SV',
      Password: '1234',
      Habilitado: true,
    },
    {
      Id: 4,
      DNI: '32960042',
      Nombre: 'Supermercado CVL',
      Apellido: 'Supermercado CVL',
      Usuario: 'CVL',
      Password: '1234',
      Habilitado: true,
    },
    {
      Id: 5,
      DNI: '32960059',
      Nombre: 'Supermercado SAL',
      Apellido: 'Supermercado SAL',
      Usuario: 'SAL',
      Password: '1234',
      Habilitado: true,
    },
    {
      Id: 6,
      DNI: '32960066',
      Nombre: 'Supermercado 60C',
      Apellido: 'Supermercado 60C',
      Usuario: '60C',
      Password: '1234',
      Habilitado: true,
    },
    {
      Id: 7,
      DNI: '32960240',
      Nombre: 'Supermercado AG',
      Apellido: 'Supermercado AG',
      Usuario: 'AG',
      Password: '1234',
      Habilitado: true,
    },
    {
      Id: 8,
      DNI: '32960295',
      Nombre: 'Supermercado TLH',
      Apellido: 'Supermercado TLH',
      Usuario: 'TLH',
      Password: '1234',
      Habilitado: true,
    },
    {
      Id: 9,
      DNI: '32960301',
      Nombre: 'Supermercado TSM',
      Apellido: 'Supermercado TSM',
      Usuario: 'TSM',
      Password: '1234',
      Habilitado: true,
    },
    {
      Id: 10,
      DNI: '32960332',
      Nombre: 'Supermercado COC',
      Apellido: 'Supermercado COC',
      Usuario: 'COC',
      Password: '1234',
      Habilitado: true,
    },
    {
      Id: 11,
      DNI: '44653284',
      Nombre: 'Cristian',
      Apellido: 'Sosa',
      Usuario: 'csosa',
      Password: '1234',
      Habilitado: true,
    },
    {
      Id: 12,
      DNI: '33635537',
      Nombre: 'Marcos',
      Apellido: 'Castillo',
      Usuario: 'mcastillo',
      Password: '1234',
      Habilitado: true,
    },
    {
      Id: 13,
      DNI: '38646737',
      Nombre: 'Matias',
      Apellido: 'Molina',
      Usuario: 'mmolina',
      Password: '1234',
      Habilitado: true,
    },
    {
      Id: 14,
      DNI: '29252672',
      Nombre: 'Roberto',
      Apellido: 'Buttiero',
      Usuario: 'rbuttiero',
      Password: '1234',
      Habilitado: true,
    },
    {
      Id: 15,
      DNI: '27037261',
      Nombre: 'Guillermo',
      Apellido: 'Tevez',
      Usuario: 'gtevez',
      Password: '1234',
      Habilitado: true,
    },
    {
      Id: 16,
      DNI: '28118516',
      Nombre: 'Pablo',
      Apellido: 'Marino',
      Usuario: 'pmarino',
      Password: '1234',
      Habilitado: true,
    },
    {
      Id: 17,
      DNI: '35527510',
      Nombre: 'David',
      Apellido: 'Barrera',
      Usuario: 'dbarrera',
      Password: '1234',
      Habilitado: true,
    },
    {
      Id: 18,
      DNI: '39070219',
      Nombre: 'Rodrigo',
      Apellido: 'Portillo',
      Usuario: 'rportillo',
      Password: '1234',
      Habilitado: true,
    },
    {
      Id: 19,
      DNI: '28369410',
      Nombre: 'Eduardo',
      Apellido: 'Huanco',
      Usuario: 'ehuanco',
      Password: '1234',
      Habilitado: true,
    },
    {
      Id: 20,
      DNI: '36355772',
      Nombre: 'Matias',
      Apellido: 'Chavez',
      Usuario: 'mchavez',
      Password: '1234',
      Habilitado: true,
    },
    {
      Id: 21,
      DNI: '34575251',
      Nombre: 'Mayco',
      Apellido: 'Rosales',
      Usuario: 'mrosales',
      Password: '1234',
      Habilitado: true,
    },
    {
      Id: 22,
      DNI: '24474050',
      Nombre: 'Marcelo',
      Apellido: 'Urriche',
      Usuario: 'murriche',
      Password: '1234',
      Habilitado: true,
    },
    {
      Id: 23,
      DNI: '99999999',
      Nombre: 'Admin',
      Apellido: 'Admin',
      Usuario: 'admin',
      Password: '1234',
      Habilitado: true,
    },
  ];

  constructor(private http: HttpClient) {
    super('DinoEnvases');
    this.version(1).stores({
      usuarios:
        'Id, DNI, Nombre, Apellido, Usuario, Password, Habilitado, &UsuarioPassword',
    });
    this.usersDB = this.table('usuarios');

    this.usersDB.bulkAdd(this.usuarios);
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

  validateUserOnIndexDB = async (
    usuario: IUserToVerify
  ): Promise<IFullUser | undefined> => {
    const isUsuario = await this.usersDB
      .where({ Usuario: usuario.Usuario, Password: usuario.Password })
      .first();

    return isUsuario;
  };

  synchronizeUsers = (): void => {};

  // LocalStorage Handlers
  setUserOnLocalStorage = (usuario: IShortUser): void => {
    this.userData = usuario;
    localStorage.setItem('usuario', JSON.stringify(usuario));
  };

  clearUserOnLocalStorage = (): void => localStorage.removeItem('usuario');

  getDataUserOnLocalStorage = (): IShortUser | null => {
    if (this.userData) {
      return this.userData;
    } else if (localStorage.getItem('usuario')) {
      this.userData = JSON.parse(localStorage.getItem('usuario')!);
      return this.userData;
    } else {
      return null;
    }
  };
}
