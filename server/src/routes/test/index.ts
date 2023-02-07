import { Express } from "express";
import { oneUserTestRouter } from "./oneUser";

const testURI = "/api/test";

export const testRoutes = (app: Express) => {
  app.use(`${testURI}`, oneUserTestRouter);
};
