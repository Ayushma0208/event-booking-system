import pool from "../config/db.js";


// Create Event
export const createEvent = async ({ title, description, date, location, capacity, price }) => {
  const result = await pool.query(
    `INSERT INTO events (title, description, date, location, capacity, price)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [title, description, date, location, capacity, price]
  );
  return result.rows[0];
};

// Get All Events
export const getAllEvents = async () => {
  const result = await pool.query(`SELECT * FROM events ORDER BY date ASC`);
  return result.rows;
};

// Get Single Event
export const getEventById = async (id) => {
  const result = await pool.query(`SELECT * FROM events WHERE id = $1`, [id]);
  return result.rows[0];
};