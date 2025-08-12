const mongoose = require("mongoose");

// Define a schema for the User collection
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

module.exports = mongoose.model("User", userSchema);
