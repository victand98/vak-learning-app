import express, { Request, Response } from "express";
import { requireAuth } from "../../middlewares";
import { ExerciseModel } from "../../models";

const allByUserRouter = express.Router();

allByUserRouter.get(
  "/user",
  requireAuth,
  async (req: Request, res: Response) => {
    const user = req.currentUser?.id;
    const exercises = await ExerciseModel.find({ user });

    res.json(exercises);
  }
);

export { allByUserRouter };
