import express from "express";
import { loginUser, registerUser, updateProfile } from "../controllers/authController.js";
const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.put("/update-profile", updateProfile);

router.get("/profile", getUserProfile);

router.delete("/:id", deleteUser);


export default router;