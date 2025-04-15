import express from "express";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
import bookRouter from "./routes/bookRoute.js";
import cors from 'cors'
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    return res.status(200).send("Hello World");
});

app.use('/books', bookRouter);






mongoose.connect(mongoDBURL)
    .then(() => {
        console.log("App Is Connected Successfully");
        app.listen(PORT, () => {
            console.log(`PORT Is Running On ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Database connection error:", error.message);
    });
