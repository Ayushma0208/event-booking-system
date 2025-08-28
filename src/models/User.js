import pool from "../config/db.js";

// Find user by email
export const findByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  return result.rows[0]; // return single user
};

// Create new user
export const createUser = async (name, email, password, role) => {
  const result = await pool.query(
    "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role",
    [name, email, password, role || "user"]
  );
  return result.rows[0]; // return newly created user
};

export const findUserByEmail = async (email) => {
  const query = "SELECT * FROM users WHERE email = $1";
  const values = [email];
  const result = await pool.query(query, values);
  return result.rows[0]; // return single user
};
