import express from "express"
import { createBookingController, getAllBookingsController, getBookingByIdController, updateBookingController } from "../controllers/bookingController";

const router = express.Router();

router.post('/booking', createBookingController);

router.get("/getAllBooking", getAllBookingsController);

router.get("/getSinglebookingId", getBookingByIdController);

router.put("/updateBookingId", updateBookingController);

export default router;