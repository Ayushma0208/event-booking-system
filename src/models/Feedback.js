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