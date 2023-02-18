import express, { Request, Response } from "express";
import { requireAuth } from "../../middlewares";

const saveTestRouter = express.Router();

saveTestRouter.post("/", requireAuth, async (req: Request, res: Response) => {
  console.log("req.body", req.body);
  const user = req.currentUser?.id;
  console.log("user", user);
  //   const result = await TestModel.create({});
  res.json({});
});

export { saveTestRouter };
