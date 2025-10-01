import { addFeedback } from "../models/Feedback.js";


export const addFeedbackController = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { user_id, rating, comment } = req.body;

    const feedback = await addFeedback(eventId, user_id, rating, comment);
    res.status(201).json({ message: "Feedback added successfully", feedback });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};