import express from "express";
import { changePasswordController, deleteUser, getUserProfile, loginUser, registerUser, updateProfile } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/register", registerUser)

router.post("/login", loginUser)

router.put("/update-profile", authMiddleware,updateProfile)

router.get("/profile", authMiddleware, getUserProfile)

router.delete("/delete", deleteUser)

router.patch("/change-password", authMiddleware, changePasswordController)


export default router;