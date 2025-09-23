import express from "express"
import { createEventController, deleteEventController, getAllEventsController, getEventByIdController, registerForEventController, updateEventController } from "../controllers/eventController.js";

const router = express.Router();

router.post("/CreateEvents", createEventController);

router.get("/getAllEvents", getAllEventsController);

router.get("/getSingleEvents", getEventByIdController);

router.put("/updateEvent/:id", updateEventController);

router.delete("/deleteEvent/:id", deleteEventController);

router.post("/register/:eventId", registerForEventController);

export default router;