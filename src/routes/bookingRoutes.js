import express from "express"
import { assignSeat, cancelBookingController, checkBookingAvailabilityController, createBookingController, getAllBookingsController, getBookingByIdController, updateBookingController } from "../controllers/bookingController.js";

const router = express.Router();

router.post('/booking', createBookingController);

router.get("/getAllBooking", getAllBookingsController);

router.get("/getSinglebookingId", getBookingByIdController);

router.put("/updateBookingId", updateBookingController);

router.delete("/cancelBookingId", cancelBookingController);

router.get("/availability", checkBookingAvailabilityController);

router.post("/bookings/:id/assign-seat", assignSeat);

export default router;