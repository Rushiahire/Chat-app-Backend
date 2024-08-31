import express from "express";
import { connectDB } from "./data/dbConnection.js";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import messagesRoute from "./routes/messagesRoute.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { configDotenv } from "dotenv";

export const app = express();


configDotenv({
  path: "./data/config.env",
});

app.use(
  cors({
    origin: ["https://chat-ph1545ugd-rushiahires-projects.vercel.app/", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(cookieParser());



app.use("/", userRoute);
app.use("/v1", authRoute);
app.use("/v1/messages", messagesRoute);

app.get("/", (req, res) => {
  try {
    res.send("welcome");
  } catch (error) {
    console.log(error);
  }
});


