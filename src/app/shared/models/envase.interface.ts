export interface TipoEnvase {
  Id: number;
  Nombre: 'cerveza' | 'gaseosa' | 'drago' | 'cajón';
  Habilitado: boolean;
}

export interface Envase {
  Id: number;
  Codigo: string;
  Descripcion: string;
  EAN: string;
  Precio?: string;
  TipoEnvaseId: number;
  Cantidades?: number;
}

export interface EnvaseDTO {
  EnvaseId: number | null;
  TipoEnvaseId: number | null;
  Cantidad: number | null;
}

export interface IVale {
  Sucursal: string;
  ValeNro: string;
  Items: Envase[];
}

export interface IAddValeResponse {
  Id: string;
  IdUsuario: number;
  NombreUsuario: string;
  IdSucursal: number;
  NroSucursal: number;
  NombreSucursal: string;
  TipoTkFiscal: null | string;
  NroTkFiscal: null | string;
  PvFiscal: null | string;
  NroTransaccion: null | string;
  IdEstadoVale: number | boolean;
  FechaHora: string;
  EAN: string;
}
