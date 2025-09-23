import { createEvent, getAllEvents, getEventById, updateEvent } from "../models/Events.js";

export const createEventController = async (req, res) => {
  try {
    const { title, description, date, location, capacity, price } = req.body;

    if (!title || !date || !location || !capacity) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const event = await createEvent({ title, description, date, location, capacity, price });
    res.status(201).json({ success: true, event });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}


export const getAllEventsController = async (req, res) => {
  try {
    const events = await getAllEvents();
    res.status(201).json({ success: true, events });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}


export const getEventByIdController = async (req, res) => {
  try {
    const id = req.query.id;
    const event = await getEventById(id);

    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    res.json(event);
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}


export const updateEventController = async (req, res) => {
  try {
    const { id } = req.params;
    const eventData = req.body; 

    const updatedEvent = await updateEvent(id, eventData);

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({
      message: "Event updated successfully",
      event: updatedEvent,
    });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}