import dotenv from "dotenv";
import express from "express";
import "express-async-errors";
import { NotFoundError } from "./errors";
import { currentUser, errorHandler } from "./middlewares";
import routes from "./routes";
import cors from "cors";
dotenv.config();

const app = express();

app.set("port", process.env.PORT || 4000);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(currentUser);

routes(app);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
