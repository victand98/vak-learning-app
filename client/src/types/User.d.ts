import { Genders } from "./Enums";

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  status: boolean;
  gender: Genders;
  course: string;
  educationalUnit: string;
}

export type SigninForm = Pick<User, "email" | "password">;

export type SignupForm = Omit<User, "id" | "status">;
