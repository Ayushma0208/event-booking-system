import express from "express";
import { addFeedbackController, deleteFeedbackController, getFeedbackByEventController, getFeedbackByUserController, updateFeedbackController } from "../controllers/feedbackController.js";
const router = express.Router();

router.post("/addFeedback", addFeedbackController)

router.get("/getFeedback", getFeedbackByEventController)

router.put("/updateFeedback", updateFeedbackController)

router.delete("/deleteFeedback", deleteFeedbackController)

router.get("/users/:userId/feedback", getFeedbackByUserController);


export default router;