import express from "express"
import { createEventController, getAllEventsController, getEventByIdController } from "../controllers/eventController.js";

const router = express.Router();

router.post("/events", createEventController);
router.get("/events", getAllEventsController);
router.get("/events/:id", getEventByIdController);

export default router;