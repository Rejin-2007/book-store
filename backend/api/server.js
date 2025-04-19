import express from "express";
import mongoose from "mongoose";
import bookRouter from "../routes/bookRoute.js";
import cors from "cors";
import dotenv from "dotenv";
import serverless from "serverless-http";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.status(200).send("<h1>Hello World</h1>");
});
app.use("/books", bookRouter);

// MongoDB connect (once only)
let isConnected = false;
const connectToMongo = async () => {
  if (!isConnected) {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("Connected to MongoDB");
  }
};

// Wrap express in serverless handler
const handler = serverless(app);

export default async function mainHandler(req, res) {
  await connectToMongo(); // connect to DB before handling request
  return handler(req, res); // delegate to express
}
