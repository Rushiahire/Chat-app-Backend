import express from "express";
import { dbConnection } from "./dbConnection.js";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import messagesRoute from "./routes/messagesRoute.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dbConnection();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
dotenv.config();

app.use("/", userRoute);
app.use("/v1", authRoute);
app.use("/v1/messages", messagesRoute);

app.get("/", (req, res) => {
  res.send("Hello");
});

const port = 4000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
