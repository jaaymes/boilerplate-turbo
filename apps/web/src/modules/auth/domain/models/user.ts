export interface IUser {
  avatar: string | null;
  createdAt: string;
  email: string;
  exp: number;
  iat: number;
  name: string;
  sub: string;
}

export type TUserCreate = {
  name: string;
  email: string;
  password: string;
  avatar?: string;
};
