import express, { Request, Response } from "express";
import { requireAuth } from "../../middlewares";
import { TestModel } from "../../models";

const saveTestRouter = express.Router();

saveTestRouter.post("/", requireAuth, async (req: Request, res: Response) => {
  const { learningTypes, answers } = req.body;
  const user = req.currentUser?.id;

  const test = new TestModel({ user, completed: true, learningTypes, answers });
  await test.save();

  res.status(201).json(test);
});

export { saveTestRouter };
