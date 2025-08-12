const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getUser,
  resetPassword,
} = require("../controllers/authController");
const verifyToken = require("../middleware");

router.post("/register", register);
router.post("/login", login);
router.post("/reset", resetPassword);
router.get("/user", verifyToken, getUser);

module.exports = router;
