import { Express } from "express";
import { saveTestRouter } from "./save";
import { oneUserTestRouter } from "./oneUser";

const testURI = "/api/test";

export const testRoutes = (app: Express) => {
  app.use(testURI, oneUserTestRouter);
  app.use(testURI, saveTestRouter);
};
