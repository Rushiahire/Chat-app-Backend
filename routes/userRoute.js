import express from "express";
import { getAllSidebarUsers } from "../controllers/userControllers.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.get("/users", getAllSidebarUsers);

export default router;
