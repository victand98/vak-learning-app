import { Base } from "./Base";
import { Genders } from "./Enums";

export interface User extends Base {
  firstName: string;
  lastName: string;
  email: string;
  status: boolean;
  gender: Genders;
  course: string;
  educationalUnit: string;
  age: number;
}

export interface SigninResponse {
  token: string;
  user: User;
}

export type SigninForm = Pick<User, "email"> & { password: string };

export interface SignupResponse extends User {}

export type SignupForm = Pick<
  User,
  | "course"
  | "educationalUnit"
  | "email"
  | "firstName"
  | "gender"
  | "lastName"
  | "age"
> & { password: string };
