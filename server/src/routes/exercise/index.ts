import { Express } from "express";
import { saveExerciseRouter } from "./save";

const exerciseURI = "/api/exercise";

export const exerciseRoutes = (app: Express) => {
  app.use(exerciseURI, saveExerciseRouter);
};
