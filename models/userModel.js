import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    select: false,
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female"], // represent a fixed set of named values.
  },
  profilePic: {
    type: String,
    default: "",
  },
  createdAT: {
    type: Date,
    default: Date.now,
  },
});

export const users = mongoose.model("users", userSchema);
