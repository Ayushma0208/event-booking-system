import express from "express";
import { loginUser, registerUser, updateProfile } from "../controllers/authController.js";
const router = express.Router();

// Routes
router.post("/register", registerUser);

router.post("/login", loginUser);

router.put("/update-profile", updateProfile);

export default router;