import express, { Request, Response } from "express";
import { NotFoundError } from "../../errors";
import { AnswerModel, QuestionModel } from "../../models";

const oneQuestionRouter = express.Router();

oneQuestionRouter.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const question = await QuestionModel.findById(id);
  if (!question) throw new NotFoundError();

  const answers = await AnswerModel.find({ question: id });

  res.json({ question, answers });
});

export { oneQuestionRouter };
