import express from "express"

const router = express.Router();

router.post('/booking', createBookingController);

export default router;