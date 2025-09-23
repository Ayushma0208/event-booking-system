import express from "express"
import { cancelEventController, createEventController, deleteEventController, getAllEventsController, getEventByIdController, registerForEventController, updateEventController } from "../controllers/eventController.js";

const router = express.Router();

router.post("/CreateEvents", createEventController);

router.get("/getAllEvents", getAllEventsController);

router.get("/getSingleEvents", getEventByIdController);

router.put("/updateEvent/:id", updateEventController);

router.delete("/deleteEvent/:id", deleteEventController);

router.post("/register/:eventId", registerForEventController);

router.patch("/cancelEvent/:id", cancelEventController);

export default router;