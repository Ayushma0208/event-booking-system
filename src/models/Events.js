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