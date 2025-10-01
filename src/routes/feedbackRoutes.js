import express from "express";
import { addFeedbackController } from "../controllers/feedbackController.js";
const router = express.Router();

router.post("/addFeedback", addFeedbackController); 


export default router;