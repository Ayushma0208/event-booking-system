import express from "express";
import { addFeedbackController, deleteFeedbackController, getFeedbackByEventController, getFeedbackByUserController, updateFeedbackController } from "../controllers/feedbackController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/addFeedback",authMiddleware, addFeedbackController)

router.get("/getFeedback", getFeedbackByEventController)

router.put("/updateFeedback",authMiddleware, updateFeedbackController)

router.delete("/deleteFeedback", authMiddleware, deleteFeedbackController)

router.get("/users/:userId/feedback", getFeedbackByUserController)


export default router;