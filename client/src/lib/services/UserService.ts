import { SigninForm, SignupForm } from "@/types";
import { request } from "../helpers";

export class UserService {
  static signin = (data: SigninForm) => request.post("/api/user/signin", data);
  static signup = (data: SignupForm) => request.post("/api/user/signup", data);
}