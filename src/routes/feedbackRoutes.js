import express from "express";
import { addFeedbackController, getFeedbackByEventController } from "../controllers/feedbackController.js";
const router = express.Router();

router.post("/addFeedback", addFeedbackController); 

router.get("/getFeedback", getFeedbackByEventController);


export default router;