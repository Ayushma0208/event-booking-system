import { createAdmin, findAdminByEmail } from "../models/admin.js";

export const signupAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await findAdminByEmail(email);
    if (existing) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await createAdmin(name, email, hashedPassword);

    res.status(201).json({message: "Admin registered successfully",admin: newAdmin});
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
};