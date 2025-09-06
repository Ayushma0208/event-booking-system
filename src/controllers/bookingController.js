import { createBooking, getAllBookings, getBookingById, updateBooking } from "../models/Booking";

export const createBookingController = async (req, res) => {
  try {
    const { eventId, userId, numberOfTickets } = req.body;

    if (!eventId || !userId || !numberOfTickets) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const booking = await createBooking({ eventId, userId, numberOfTickets });

    res.status(201).json({message: "Booking created successfully",booking});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getAllBookingsController = async (req, res) => {
  try {
    const { userId, eventId } = req.query;

    const bookings = await getAllBookings({ userId, eventId });

    res.status(200).json({message: "Bookings fetched successfully",bookings});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBookingByIdController = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await getBookingById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({
      message: "Booking fetched successfully",
      booking
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBookingController = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { numberOfTickets, status } = req.body;

    const updatedBooking = await updateBooking(bookingId, { numberOfTickets, status });

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({
      message: "Booking updated successfully",
      booking: updatedBooking
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};