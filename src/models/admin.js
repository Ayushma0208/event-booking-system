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

export const findAdminByEmail = async (email) => {
  const query = "SELECT * FROM admins WHERE email = $1";
  const result = await pool.query(query, [email]);
  return result.rows[0];
};

export const findAdminById = async (id) => {
  const query = "SELECT id, name, email, role, created_at FROM admins WHERE id = $1";
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

export const getAdminById = async (adminId) => {
  const result = await pool.query(
    "SELECT id, name, email, role FROM admins WHERE id = $1",
    [adminId]
  );
  return result.rows[0];
};