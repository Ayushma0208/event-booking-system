import pool from "../config/db.js";

export const createEvent = async ({ title, description, date, location, capacity, price }) => {
  const result = await pool.query(
    `INSERT INTO events (title, description, date, location, capacity, price)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [title, description, date, location, capacity, price]
  );
  return result.rows[0];
};


export const getAllEvents = async () => {
  const result = await pool.query(`SELECT * FROM events ORDER BY date ASC`);
  return result.rows;
};


export const getEventById = async (id) => {
  const result = await pool.query(`SELECT * FROM events WHERE id = $1`, [id]);
  return result.rows[0];
};

export const updateEvent = async (id, { title, description, date, location }) => {
  const result = await pool.query(
    `UPDATE events 
     SET title = $1, description = $2, date = $3, location = $4
     WHERE id = $5
     RETURNING *`,
    [title, description, date, location, id]
  );

  return result.rows[0];
}

export const deleteEvent = async (id) => {
  const result = await pool.query(
    `DELETE FROM events 
     WHERE id = $1
     RETURNING *`,
    [id]
  );

  return result.rows[0];
}

export const registerForEvent = async (eventId, userId, numberOfTickets) => {
  const result = await pool.query(
    `INSERT INTO event_registrations (event_id, user_id, number_of_tickets, status)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [eventId, userId, numberOfTickets, "confirmed"]
  );

  return result.rows[0];
};


export const cancelEvent = async (id) => {
  const result = await pool.query(
    `UPDATE events 
     SET status = $1
     WHERE id = $2
     RETURNING *`,
    ["canceled", id]
  );

  return result.rows[0];
};