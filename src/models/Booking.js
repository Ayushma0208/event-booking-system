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

export const updateBooking = async (bookingId, updates) => {
  const { numberOfTickets, status } = updates;

  const result = await pool.query(
    `UPDATE bookings
     SET number_of_tickets = COALESCE($1, number_of_tickets),
         status = COALESCE($2, status)
     WHERE id = $3
     RETURNING *`,
    [numberOfTickets, status, bookingId]
  );

  return result.rows[0]; 
};

export const cancelBooking = async (bookingId) => {
  const result = await pool.query(
    `UPDATE bookings
     SET status = 'canceled'
     WHERE id = $1
     RETURNING *`,
    [bookingId]
  );
  return result.rows[0]; 
};

export const checkBookingAvailability = async (eventId) => {
  const result = await pool.query(
    `SELECT e.id as event_id, e.total_tickets,
            COALESCE(SUM(b.number_of_tickets), 0) as booked_tickets,
            (e.total_tickets - COALESCE(SUM(b.number_of_tickets), 0)) as available_tickets
     FROM events e
     LEFT JOIN bookings b ON e.id = b.event_id AND b.status != 'canceled'
     WHERE e.id = $1
     GROUP BY e.id, e.total_tickets`,
    [eventId]
  );
  return result.rows[0];
};

export const assignSeatToBooking = async (bookingId, seatNumbers) => {
  
  const booking = await pool.query("SELECT * FROM bookings WHERE id = $1", [bookingId]);
  if (booking.rows.length === 0) return null;

  const seatCheck = await pool.query(
    "SELECT * FROM bookings WHERE seat_number = ANY($1::text[]) AND status = 'confirmed'",
    [seatNumbers]
  );
  if (seatCheck.rows.length > 0) {
    return null; 
  }

  const result = await pool.query(
    "UPDATE bookings SET seat_number = $1 WHERE id = $2 RETURNING *",
    [seatNumbers.join(","), bookingId]
  );

  return result.rows[0];
};