import express from "express";
import { getAllSidebarUsers } from "../controllers/userControllers.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.get("/users", isAuthenticated, getAllSidebarUsers);

export default router;
