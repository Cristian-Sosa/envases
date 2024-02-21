import { Injectable } from '@angular/core';
import Dexie from 'dexie';

import { usuarios, envases, tipoEnvases } from './index';
import { Envase, IFullUser, IUserToVerify, TipoEnvase } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  private db: Dexie = new Dexie('DinoEnvases');

  constructor() {
    Dexie.exists('DinoEnvases').then((exist) => {
      if (!exist) {
        this.db.version(1).stores({
          usuarios:
            'Id, DNI, Nombre, Apellido, Usuario, Password, Habilitado, [Usuario+Password]',
          tipo_envase: 'Id, Nombre, Habilitado',
          envase: 'Id, Codigo, Descripcion, EAN, Precio, TipoEnvaseId',
        });

        this.db.table('usuarios').bulkAdd(usuarios);
        this.db.table('tipo_envase').bulkAdd(tipoEnvases);
        this.db.table('envase').bulkAdd(envases);
      } else {
        this.db.open();
      }
    });
  }

  getDataBase = (): Dexie => this.db;

  getEnvases = async (): Promise<Envase[]> =>
    await this.db.table('envase').toArray();

  getTipoEnvases = async (): Promise<TipoEnvase[]> =>
    await this.db.table('tipo_envase').toArray();

  getAllUsers = async (): Promise<IFullUser[]> =>
    await this.db.table('usuarios').toArray();

  getOneUser = async (
    userToSearch: IUserToVerify
  ): Promise<IFullUser | undefined> => {
    return await this.db
      .table('usuarios')
      .where({
        Usuario: userToSearch.Username,
        Password: userToSearch.Password,
      })
      .first();
  };

  getOneEnvase = async (tipoEnvaseId: string): Promise<Envase[]> => {
    return await this.db
      .table('envase')
      .where({
        TipoEnvaseId: tipoEnvaseId,
      })
      .toArray();
  };
}
