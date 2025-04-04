export interface IUser {
  name: string;
  email: string;
  password: string;
}

export interface IUserUpdate extends IUser {
  id: number;
}
