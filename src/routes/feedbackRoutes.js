import express from "express";
import { addFeedbackController, deleteFeedbackController, getFeedbackByEventController, updateFeedbackController } from "../controllers/feedbackController.js";
const router = express.Router();

router.post("/addFeedback", addFeedbackController)

router.get("/getFeedback", getFeedbackByEventController)

router.put("/updateFeedback", updateFeedbackController)

router.delete("/deleteFeedback", deleteFeedbackController)


export default router;