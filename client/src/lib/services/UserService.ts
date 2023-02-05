import {
  SigninForm,
  SigninResponse,
  SignupForm,
  SignupResponse,
} from "@/types";
import { request } from "../helpers";

export class UserService {
  static signin = (data: SigninForm) =>
    request.post<SigninResponse>("/api/user/signin", data);
  static signup = (data: SignupForm) =>
    request.post<SignupResponse>("/api/user/signup", data);
}
