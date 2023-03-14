import { Express } from "express";
import { allByUserRouter } from "./allByUser";
import { lastByUserRouter } from "./lastByUser";
import { saveExerciseRouter } from "./save";

const exerciseURI = "/api/exercise";

export const exerciseRoutes = (app: Express) => {
  app.use(exerciseURI, allByUserRouter);
  app.use(exerciseURI, lastByUserRouter);
  app.use(exerciseURI, saveExerciseRouter);
};
