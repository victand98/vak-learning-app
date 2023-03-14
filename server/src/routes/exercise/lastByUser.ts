import express, { Request, Response } from "express";
import { requireAuth } from "../../middlewares";
import { ExerciseModel } from "../../models";

const lastByUserRouter = express.Router();

lastByUserRouter.get(
  "/last/user",
  requireAuth,
  async (req: Request, res: Response) => {
    const user = req.currentUser?.id;
    const exercise = await ExerciseModel.findOne({ user }).sort({
      createdAt: -1,
    });

    res.json(exercise);
  }
);

export { lastByUserRouter };
