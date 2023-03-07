import express, { Request, Response } from "express";
import { body } from "express-validator";
import { BadRequestError } from "../../errors";
import { validateRequest } from "../../middlewares";
import { UserModel } from "../../models";

const signupRouter = express.Router();

const validators = [
  body("email").trim().isEmail().withMessage("El email debe ser válido."),
  body("firstName")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Escriba al menos 3 caracteres"),
  body("lastName")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Escriba al menos 3 caracteres"),
  body("password")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("La contraseña debe tener entre 4 y 20 caracteres."),
  body("age").trim().notEmpty().withMessage("El campo es requerido."),
  body("gender").trim().notEmpty().withMessage("El campo es requerido."),
  body("course")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Escriba al menos 1 caracter"),
  body("educationalUnit")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Escriba al menos 3 caracteres"),
];

signupRouter.post(
  "/signup",
  validators,
  validateRequest,
  async (req: Request, res: Response) => {
    const {
      firstName,
      lastName,
      email,
      password,
      gender,
      course,
      educationalUnit,
      age,
    } = req.body;

    const existingUser = await UserModel.findOne({ email });

    if (existingUser)
      throw new BadRequestError("El usuario ya está registrado", "email");

    const user = new UserModel({
      email,
      password,
      firstName,
      lastName,
      gender,
      course,
      educationalUnit,
      age,
    });
    await user.save();

    res.status(201).json(user);
  }
);

export { signupRouter };
