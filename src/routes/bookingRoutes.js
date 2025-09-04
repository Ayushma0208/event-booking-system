import express from "express"
import { createBookingController, getAllBookingsController } from "../controllers/bookingController";

const router = express.Router();

router.post('/booking', createBookingController);

router.get("/getAllBooking", getAllBookingsController);

export default router;