import express from "express"
import { createEventController, getAllEventsController, getEventByIdController } from "../controllers/eventController.js";

const router = express.Router();

router.post("/CreateEvents", createEventController);

router.get("/getAllEvents", getAllEventsController);

router.get("/getSingleEvents", getEventByIdController);

export default router;