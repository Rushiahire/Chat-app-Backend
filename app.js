import express from "express";
import { dbConnection } from "./dbConnection.js";
import userRoute from "./routes/user.js";
import cors from "cors";
import cookieParser from "cookie-parser";
dbConnection();

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/v1", userRoute);

app.get("/", (req, res) => {
  res.send("Hello");
});

const port = 4000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
