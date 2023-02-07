import express, { Request, Response } from "express";
import { requireAuth } from "../../middlewares";
import { TestModel } from "../../models";

const oneUserTestRouter = express.Router();

oneUserTestRouter.get(
  "/user",
  requireAuth,
  async (req: Request, res: Response) => {
    const { id } = req.currentUser!;
    const result = await TestModel.findOne({ user: id });
    res.json(result);
  }
);

export { oneUserTestRouter };
