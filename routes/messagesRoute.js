import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { sendMessage, getMessages } from "../controllers/messageController.js";

const router = express.Router();

router.get("/:id", isAuthenticated, getMessages);
router.post("/send/:id", isAuthenticated, sendMessage);
router.post("/send/:id", isAuthenticated, sendMessage);

export default router;
