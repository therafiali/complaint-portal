const express = require("express");
const {
  register,
  login,
  getUser,
  resetPassword,
} = require("../controllers/authController");
const verifyToken = require("../middleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/reset", resetPassword);
router.get("/user", verifyToken, getUser);

module.exports = router;
