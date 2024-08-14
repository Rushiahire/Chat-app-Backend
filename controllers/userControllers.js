import { users } from "../models/userModel.js";

export const getAllSidebarUsers = async (req, res) => {
  try {
    const loginInUserId = req.user._id;
    const filteredUsers = await users.find({ _id: { $ne: loginInUserId } });

    res.status(200).json({ status: "success", filteredUsers });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "Internal Server Error" });
  }
};
