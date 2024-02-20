export interface TipoEnvase {
  id: number;
  nombre: 'cerveza' | 'gaseosa' | 'drago' | 'cajón';
  habilitado: boolean;
}

export interface Envase {
  id: number;
  codigo: string;
  descripcion: string;
  ean: string;
  precio?: number;
  tipoEnvaseID: number;
  cantidades?: number;
}

export interface EnvaseDTO {
  envaseId: number | null;
  tipoEnvaseId: number | null;
  cantidad: number | null;
}

export interface IVale {
  sucursal: string;
  valeNro: string;
  items: Envase[];
}

export interface IAddValeResponse {
  id: string;
  idUsuario: number;
  nombreUsuario: string;
  idSucursal: number;
  nroSucursal: number;
  nombreSucursal: string;
  tipoTkFiscal: null | string;
  nroTkFiscal: null | string;
  pvFiscal: null | string;
  nroTransaccion: null | string;
  idEstadoVale: number | boolean;
  fechaHora: string;
  ean: string;
}
