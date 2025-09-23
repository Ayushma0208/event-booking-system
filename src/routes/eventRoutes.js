import express from "express"
import { createEventController, deleteEventController, getAllEventsController, getEventByIdController, updateEventController } from "../controllers/eventController.js";

const router = express.Router();

router.post("/CreateEvents", createEventController);

router.get("/getAllEvents", getAllEventsController);

router.get("/getSingleEvents", getEventByIdController);

router.put("/updateEvent/:id", updateEventController);

router.delete("/deleteEvent/:id", deleteEventController);

export default router;