import pool from "../config/db.js";

export const createBooking = async ({ eventId, userId, numberOfTickets, status }) => {
  const result = await pool.query(
    `INSERT INTO bookings (event_id, user_id, number_of_tickets, status)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [eventId, userId, numberOfTickets, status || 'confirmed']
  );

  return result.rows[0];
};