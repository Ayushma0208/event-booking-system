import { createAdmin, findAdminByEmail, getAdminById, updateAdmin } from "../models/admin.js";

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

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await findAdminByEmail(email);
    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin.id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({message: "Login successful",token});
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await getAdminById(id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: "Error fetching admin", error: error.message });
  }
}

export const updateAdminController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role } = req.body;

    const updatedAdmin = await updateAdmin(id, name, email, role);

    if (!updatedAdmin) {
      return res.status(404).json({ message: "Admin not found or update failed" });
    }
    res.status(200).json({message: "Admin updated successfully",admin: updatedAdmin});
  } catch (error) {
    res.status(500).json({ message: "Error updating admin", error: error.message });
  }
}