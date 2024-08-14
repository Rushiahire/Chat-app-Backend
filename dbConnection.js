import mongoose from "mongoose";

export const dbConnection = async (req, res) => {
  try {
    await mongoose
      .connect("mongodb://localhost:27017", {
        dbName: "chatApp",
      })
      .then(() => {
        console.log("Connected");
      });
  } catch (error) {
    console.log("error found", error);
  }
};
