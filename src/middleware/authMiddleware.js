import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    // 🔍 Get token from header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided, authorization denied" });
    }

    const token = authHeader.split(" ")[1];

    // 🔑 Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Attach user info to request
    req.user = { id: decoded.id, email: decoded.email };

    next(); // continue to controller
  } catch (err) {
    console.error("Auth error:", err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
