import express from "express";
import { registerUser } from "../controllers/authController.js";
const router = express.Router();

// Routes
router.post("/register", registerUser);
// router.post("/login", loginUser);
// router.get("/profile", getProfile);

export default router;