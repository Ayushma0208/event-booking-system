import { addFeedback, getFeedbackByEvent, updateFeedback } from "../models/Feedback.js";


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

export const getFeedbackByEventController = async (req, res) => {
  try {
    const { eventId } = req.params;
    const feedbacks = await getFeedbackByEvent(eventId);
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateFeedbackController = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;

    const feedback = await updateFeedback(id, rating, comment);

    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    res.json({ message: "Feedback updated successfully", feedback });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};