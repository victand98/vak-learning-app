import { SigninForm } from "@/types";
import { request } from "../helpers";

export class UserService {
  static signin = (data: SigninForm) => request.post("/api/user/signin", data);
}
