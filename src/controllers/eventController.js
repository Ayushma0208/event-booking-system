import { createBooking } from "../models/Booking";

export const createBookingController = async (req, res) => {
  try {
    const { eventId, userId, numberOfTickets } = req.body;

    if (!eventId || !userId || !numberOfTickets) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const booking = await createBooking({ eventId, userId, numberOfTickets });

    res.status(201).json({
      message: "Booking created successfully",
      booking
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};