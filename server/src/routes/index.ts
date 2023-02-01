import { Express } from "express";
import { questionRoutes } from "./question";
import { userRoutes } from "./user";

export default (app: Express) => {
  userRoutes(app);
  questionRoutes(app);
};
