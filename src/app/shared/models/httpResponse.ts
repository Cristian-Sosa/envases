import { IFullUser, IShortUser } from ".";

export interface IResponse {
  status: number;
  message: string;
}
// Get all active users
export interface IActiveUsersResponse extends IResponse {
  data: IFullUser[];
}
// Validate User
export interface IValidateUserResponse extends IResponse {
  data: IShortUser;
}
// Create new user
export interface ICreateUserResponse extends IResponse {
  data: null;
}