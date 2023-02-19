import { NewTest, Test } from "@/types";
import { Session } from "next-auth";
import { request } from "../helpers";

export class TestService {
  static oneUser = (session: Session) =>
    request.get<Test | null>("/api/test/user", { params: { session } });

  static save = (test: NewTest, session: Session) =>
    request.post<Test>("/api/test", test, { params: { session } });
}
