import { Express } from "express";
import { allQuestionRouter } from "./all";
import { oneQuestionRouter } from "./one";

const questionURI = "/api/question";

export const questionRoutes = (app: Express) => {
  app.use(`${questionURI}`, allQuestionRouter);
  app.use(`${questionURI}`, oneQuestionRouter);
};
