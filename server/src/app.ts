import express from "express";
import "express-async-errors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.set("port", process.env.PORT || 4000);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export { app };
