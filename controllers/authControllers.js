import bcrypt, { compareSync } from "bcrypt";
import { users } from "../models/userModel.js";
import { generateCookie } from "../utils/generateCookie.js";

export const registerUser = async (req, res) => {
  try {
    const { fullName, email, password, gender } = req.body;

    if (!fullName || !email || !password || !gender) {
      return res
        .status(400)
        .json({ status: "error", message: "All fields are required" });
    }

    let emailAvl = await users.findOne({ email });
    if (emailAvl) {
      res.status(409).json({ status: "success", message: `${email} already in use` });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?name=${fullName}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?name=${fullName}`;

    await users.create({
      fullName,
      email,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    return res
      .status(201)
      .json({ status: "success", message: "Register Successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal server Error" });
  }
};

export const loginUser = async (req, res) => {
  console.log("reqq", req.body);
  try {
    const { email, password } = req.body;

    const verifyEmail = await users.findOne({ email }).select("+password");

    if (!verifyEmail) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }

    const verifyPassword = await bcrypt.compare(password, verifyEmail.password);

    if (!verifyPassword) {
      return res
        .status(401)
        .json({ status: "error", message: "Invalid Credentials" });
    }

    const token = generateCookie(verifyEmail?.email, res);

    res.cookie("AuthToken", token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV,
      // sameSite: 'Lax',
    });

    return res.status(200).json({
      status: "success",
      message: "Login successfully!",
      token,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "Internal Server Error" });
  }
};

export const logoutUser = (req, res) => {
  try {
    const token = req.cookies.AuthToken;
    console.log(token);
    if (token) {
      return res
        .cookie("AuthToken", null, {
          httpOnly: true,
          expires: new Date(Date.now()),
        })
        .status(200)
        .json({ status: "success", message: "Logout Successfully" });
    } else {
      return res(500).json({ status: "error", message: "Failed to logout" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "Internal Server Error" });
  }
};
