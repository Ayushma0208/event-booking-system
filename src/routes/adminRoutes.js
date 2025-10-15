import express from "express";
import { signupAdmin } from "../controllers/adminController.js";
const router = express.Router();

router.post("/signup", signupAdmin);

export default router;