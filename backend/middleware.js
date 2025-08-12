const jwt = require("jsonwebtoken");

// Middleware for JWT validation
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ error: "token not avialable" });
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
