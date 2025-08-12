// Importing required modules
const express = require("express");
const connectDB = require("./database");
const authRoutes = require("./routes/authRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const cors = require("cors");

// Creating an Express application instance
const app = express();
const PORT = 3000;

app.use(cors());

// Connect to MongoDB database
connectDB();

app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", complaintRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to my user registration and login API");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
