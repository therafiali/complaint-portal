const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/users");

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ error: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ error: "Invalid email or password" });

    const token = jwt.sign(
      { email: user.email },
      process.env.JWT_SECRET || "secret",
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json({
      username: user.username,
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email, newpassword } = req.body;
    const user = await User.findOne({
      email: email,
    });

    if (!user) {
      res.status(404).json({
        error: "Invalid Email address",
      });
    }

    const hashedPassword = await bcrypt.hash(newpassword, 10);

    await User.updateOne(
      { email: email },
      { $set: { password: hashedPassword } }
    );

    res.status(201).json({
      message: "new Password updated",
    });

  } catch (error) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
};
