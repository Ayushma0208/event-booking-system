import express from "express";
import { getAdmin, loginAdmin, signupAdmin } from "../controllers/adminController.js";
const router = express.Router();

router.post("/signup", signupAdmin);

router.post("/login", loginAdmin);

router.get("/:id", getAdmin);

export default router;