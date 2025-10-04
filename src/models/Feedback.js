import pool from "../config/db.js";

export const addFeedback = async (eventId, user_id, rating, comment) => {
  const query = `
    INSERT INTO feedback (event_id, user_id, rating, comment)
    VALUES ($1, $2, $3, $4) RETURNING *;
  `;
  const values = [eventId, user_id, rating, comment];
  const result = await pool.query(query, values);
  return result.rows[0];
}

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
}

export const updateFeedback = async (id, rating, comment) => {
  const query = `
    UPDATE feedback
    SET rating = $1, comment = $2, created_at = CURRENT_TIMESTAMP
    WHERE id = $3 RETURNING *;
  `;
  const values = [rating, comment, id];
  const result = await pool.query(query, values);
  return result.rows[0];
}

export const deleteFeedback = async (id) => {
  const query = "DELETE FROM feedback WHERE id = $1 RETURNING *;";
  const result = await pool.query(query, [id]);
  return result.rows[0];
}

export const getFeedbackByUser = async (userId) => {
  const query = `
    SELECT f.id, f.rating, f.comment, f.created_at,
           e.id AS event_id, e.title AS event_title, e.start_time, e.end_time
    FROM feedback f
    JOIN events e ON f.event_id = e.id
    WHERE f.user_id = $1
    ORDER BY f.created_at DESC;
  `;
  const result = await pool.query(query, [userId]);
  return result.rows;
}