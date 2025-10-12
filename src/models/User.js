import pool from "../config/db.js";

export const findByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  return result.rows[0]; 
};

export const createUser = async (name, email, password, role) => {
  const result = await pool.query(
    "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role",
    [name, email, password, role || "user"]
  );
  return result.rows[0]; 
};

export const findUserByEmail = async (email) => {
  const query = "SELECT * FROM users WHERE email = $1";
  const values = [email];
  const result = await pool.query(query, values);
  return result.rows[0]; 
};

export const updateProfile = async (id, { name, email, password }) => {
  try {
    let fields = [];
    let values = [];
    let i = 1;

    if (name) {
      fields.push(`name = $${i++}`);
      values.push(name);
    }
    if (email) {
      fields.push(`email = $${i++}`);
      values.push(email);
    }
    if (password) {
      fields.push(`password = $${i++}`);
      values.push(password); 
    }

    values.push(id); 

    const query = `
      UPDATE users 
      SET ${fields.join(", ")} 
      WHERE id = $${i}
      RETURNING id, name, email
    `;

    const result = await pool.query(query, values);

    return result.rows[0];
  } catch (err) {
    console.error("DB error (updateProfile):", err);
    throw err;
  }
};

export const getUserById = async (id) => {
  try {
    const query = "SELECT id, name, email, created_at FROM users WHERE id = $1";
    const result = await pool.query(query, [id]);
    return result.rows[0]; 
  } catch (err) {
    console.error("DB error (getUserById):", err);
    throw err;
  }
};


export const deleteUserById = async (id) => {
  try {
    const query = "DELETE FROM users WHERE id = $1 RETURNING id, name, email";
    const result = await pool.query(query, [id]);
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0]; 
  } catch (err) {
    console.error("DB error (deleteUserById):", err);
    throw err;
  }
};

export const findUserById = async (id) => {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return result.rows[0];
};

export const updateUserPassword = async (id, hashedPassword) => {
  await pool.query("UPDATE users SET password = $1 WHERE id = $2", [
    hashedPassword,
    id,
  ]);
};