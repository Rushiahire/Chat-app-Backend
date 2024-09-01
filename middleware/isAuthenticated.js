import jwt from "jsonwebtoken";
import { users } from "../models/userModel.js";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.AuthToken || req.headers.authorization?.split(" ")[1];// Ensure this matches the cookie name

    if (!token) {
      return res
        .status(401)
        .json({ status: 401, message: "Please log in again" });
    }

    const decoded = jwt.verify(token, process.env.JsonWEBToken); // Ensure correct secret key

    const user = await users.findOne({ email: decoded.email });

    if (!user) {
      return res.status(401).json({ status: 401, message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res
      .status(400)
      .json({ status: "error", message: "Internal Server Error" });
  }
};

export default isAuthenticated;
