import express from "express"
import { cancelEventController, createEventController, deleteEventController, getAllEventsController, getEventByIdController, getPastEventsForUserController, getUpcomingEventsForUserController, registerForEventController, updateEventController } from "../controllers/eventController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/CreateEvents", createEventController)

router.get("/getAllEvents", getAllEventsController)

router.get("/getSingleEvents", getEventByIdController)

router.put("/updateEvent/:id",authMiddleware,roleMiddleware(["admin", "organizer"]) ,updateEventController)

router.delete("/deleteEvent/:id",authMiddleware,roleMiddleware(["admin", "organizer"]), deleteEventController)

router.post("/register/:eventId" ,authMiddleware,roleMiddleware(["admin", "organizer"]), registerForEventController)

router.patch("/cancelEvent/:id",authMiddleware, cancelEventController)

router.get("/users/:userId/upcoming-events", getUpcomingEventsForUserController)

router.get("/users/:userId/past-events", getPastEventsForUserController)

export default router;