import express, { Request, Response } from "express";
import { requireAuth } from "../../middlewares";
import { ExerciseModel } from "../../models";

const saveExerciseRouter = express.Router();

saveExerciseRouter.post(
  "/",
  requireAuth,
  async (req: Request, res: Response) => {
    const { user, question, totalErrors, timeElapsed } = req.body;

    const prevExercise = await ExerciseModel.findOne({ user, question });
    if (prevExercise) {
      prevExercise.set({ totalErrors, timeElapsed });
      await prevExercise.save();
      return res.status(200).json(prevExercise);
    }

    const exercise = new ExerciseModel({
      question,
      totalErrors,
      timeElapsed,
      user,
    });
    await exercise.save();

    res.status(201).json(exercise);
  }
);

export { saveExerciseRouter };
