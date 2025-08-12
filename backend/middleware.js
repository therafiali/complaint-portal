const jwt = require("jsonwebtoken");

// Middleware for JWT validation
const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ error: "token not available" });
  }

  // Extract token from "Bearer <token>" format
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.substring(7)
    : authHeader;

  if (!token) {
    return res.status(401).json({ error: "token not available" });
  }

  jwt.verify(token, "secret", (err, decoded) => {
    if (err) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }
    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;
