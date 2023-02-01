import mongoose from "mongoose";
import { app } from "./app";
import { seeders } from "./config";

const start = async () => {
  if (!process.env.JWT_KEY) throw new Error("JWT_KEY must be defined");
  if (!process.env.MONGO_URI) throw new Error("MONGO_URI must be defined");

  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
    await seeders();
  } catch (error) {
    console.error(error);
  }

  app.listen(app.get("port"), () => {
    console.log(`Listening on port ${app.get("port")}`);
  });
};

start();
