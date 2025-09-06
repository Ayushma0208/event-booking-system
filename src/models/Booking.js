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


export const getAllBookings = async (filters = {}) => {
  let baseQuery = "SELECT * FROM bookings";
  const values = [];
  const conditions = [];

  if (filters.userId) {
    values.push(filters.userId);
    conditions.push(`user_id = $${values.length}`);
  }

  if (filters.eventId) {
    values.push(filters.eventId);
    conditions.push(`event_id = $${values.length}`);
  }

  if (conditions.length) {
    baseQuery += " WHERE " + conditions.join(" AND ");
  }

  baseQuery += " ORDER BY created_at DESC";

  const result = await pool.query(baseQuery, values);
  return result.rows;
};


export const getBookingById = async (bookingId) => {
  const result = await pool.query(
    "SELECT * FROM bookings WHERE id = $1",
    [bookingId]
  );
  return result.rows[0]; 
};