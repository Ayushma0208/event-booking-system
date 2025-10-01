import express from "express";
import { addFeedbackController, getFeedbackByEventController, updateFeedbackController } from "../controllers/feedbackController.js";
const router = express.Router();

router.post("/addFeedback", addFeedbackController); 

router.get("/getFeedback", getFeedbackByEventController);

router.put("/updateFeedback", updateFeedbackController);


export default router;