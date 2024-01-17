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
          tipo_envase: 'id, nombre, habilitado',
          envase: 'id, codigo, descripcion, ean, precio, tipoEnvaseId',
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
        Usuario: userToSearch.Usuario,
        Password: userToSearch.Password,
      })
      .first();
  };

  getOneEnvase = async (tipoEnvaseId: string): Promise<Envase[]> => {
    return await this.db
      .table('envase')
      .where({
        tipoEnvaseId: tipoEnvaseId,
      })
      .toArray();
  };

  getCargaEnvases = async (): Promise<Envase[]> => {
    let envases: Envase[] = [];
    await this.db
      .table('envases')
      .toArray()
      .then((envasesResponse) => {
        envases = envasesResponse;
      })
      .catch(() => {
        throw new Error('Error al obtener envases de IndexDB');
      });

    return envases;
  };
}
