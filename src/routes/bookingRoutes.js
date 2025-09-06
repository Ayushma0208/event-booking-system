import express from "express"
import { createBookingController, getAllBookingsController, getBookingByIdController } from "../controllers/bookingController";

const router = express.Router();

router.post('/booking', createBookingController);

router.get("/getAllBooking", getAllBookingsController);

router.get("/:bookingId", getBookingByIdController);

export default router;