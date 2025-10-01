import pool from "../config/db.js";

export const addFeedback = async (eventId, user_id, rating, comment) => {
  const query = `
    INSERT INTO feedback (event_id, user_id, rating, comment)
    VALUES ($1, $2, $3, $4) RETURNING *;
  `;
  const values = [eventId, user_id, rating, comment];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const getFeedbackByEvent = async (eventId) => {
  const query = `
    SELECT f.id, f.rating, f.comment, f.created_at, u.name AS user_name
    FROM feedback f
    JOIN users u ON f.user_id = u.id
    WHERE f.event_id = $1
    ORDER BY f.created_at DESC;
  `;
  const result = await pool.query(query, [eventId]);
  return result.rows;
};