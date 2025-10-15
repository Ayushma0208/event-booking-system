import pool from "../config/db.js";

export const createAdmin = async (name, email, password) => {
  const query = `
    INSERT INTO admins (name, email, password, role)
    VALUES ($1, $2, $3, 'admin')
    RETURNING id, name, email, role, created_at
  `;
  const values = [name, email, password];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// 🔹 Find admin by email
export const findAdminByEmail = async (email) => {
  const query = "SELECT * FROM admins WHERE email = $1";
  const result = await pool.query(query, [email]);
  return result.rows[0];
};