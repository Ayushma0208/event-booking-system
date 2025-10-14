import express from "express"
import { assignSeat, cancelBookingController, checkBookingAvailabilityController, createBookingController, getAllBookingsController, getBookingByIdController, updateBookingController } from "../controllers/bookingController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/booking',authMiddleware, createBookingController)

router.get("/getAllBooking", getAllBookingsController)

router.get("/getSinglebookingId", getBookingByIdController)

router.put("/updateBookingId", updateBookingController)

router.delete("/cancelBookingId",authMiddleware, cancelBookingController)

router.get("/availability", checkBookingAvailabilityController)

router.post("/bookings/:id/assign-seat", assignSeat)

export default router;