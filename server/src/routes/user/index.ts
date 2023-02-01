import { Express } from "express";
import { currentUserRouter } from "./current-user";
import { signinRouter } from "./signin";
import { signupRouter } from "./signup";

const userURI = "/api/user";

export const userRoutes = (app: Express) => {
  app.use(userURI, signinRouter);
  app.use(userURI, signupRouter);
  app.use(userURI, currentUserRouter);
};
