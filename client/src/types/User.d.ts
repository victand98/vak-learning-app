export interface User {
  id: string;
  email: string;
  password: string;
}

export type SigninForm = Pick<User, "email" | "password">;
