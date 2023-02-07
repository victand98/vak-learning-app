import { Express } from "express";
import { questionRoutes } from "./question";
import { testRoutes } from "./test";
import { userRoutes } from "./user";

export default (app: Express) => {
  userRoutes(app);
  questionRoutes(app);
  testRoutes(app);
};
