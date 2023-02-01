import express, { Request, Response } from "express";
import { QuestionModel } from "../../models";

const allQuestionRouter = express.Router();

allQuestionRouter.get("/", async (req: Request, res: Response) => {
  const questions = await QuestionModel.find();
  res.json(questions);
});

export { allQuestionRouter };
