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

export const updateProfile = async (id, { name, email, password }) => {
  try {
    // Build dynamic update query
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
      values.push(password); // (⚠️ hash password before calling model)
    }

    values.push(id); // last value for WHERE clause

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
