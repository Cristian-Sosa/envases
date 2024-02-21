export interface IFullUser {
  Id: number;
  DNI: string;
  Nombre: string;
  Apellido: string;
  Usuario: string;
  Password: string;
  Habilitado: boolean;
}
export interface IShortUser {
  Id: number;
  Nombre: string;
  Apellido: string;
  Usuario: string;
}
export interface IUserToVerify {
  Username: string;
  Password: string;
}
export interface IUserToCreate {
  DNI: string;
  Nombre: string;
  Apellido: string;
  Usuario: string;
  Password: string;
}