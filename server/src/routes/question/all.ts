import express, { Request, Response } from "express";
import { QuestionModel } from "../../models";

const allQuestionRouter = express.Router();

allQuestionRouter.get("/", async (req: Request, res: Response) => {
  const questions = await QuestionModel.aggregate([
    { $sort: { _id: 1 } },
    {
      $lookup: {
        from: "answers",
        localField: "_id",
        foreignField: "question",
        as: "answers",
        pipeline: [
          { $set: { id: "$_id" } },
          { $project: { _id: 0, __v: 0, question: 0 } },
        ],
      },
    },
    { $set: { id: "$_id" } },
    { $project: { _id: 0, __v: 0 } },
  ]);

  res.json(questions);
});

export { allQuestionRouter };
