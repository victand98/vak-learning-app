import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { BadRequestError } from "../../errors";
import { validateRequest } from "../../middlewares";
import { UserModel } from "../../models";

const signinRouter = express.Router();

const validators = [
  body("email").isEmail().withMessage("El email debe ser válido"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("La contraseña es un campo requerido"),
];

signinRouter.post(
  "/signin",
  validators,
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) throw new BadRequestError("Las credenciales no son válidas");

    const passwordsMatch = user.password === password;

    if (!passwordsMatch)
      throw new BadRequestError("Las credenciales no son válidas");

    // Generate JWT
    const userJWT = jwt.sign(user.toJSON(), process.env.JWT_KEY!);

    res.json({ user, token: userJWT });
  }
);

export { signinRouter };
