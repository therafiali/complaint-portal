Install the necessary dependencies for our project, including Express.js, bcryptjs for password hashing, jsonwebtoken for JWT generation, and mongoose for MongoDB integration:

```
npm install express bcryptjs jsonwebtoken mongoose
```

# Authentication

```
// Importing required modules
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Creating an Express application instance
const app = express();
const PORT = 3000;

// Connect to MongoDB database
mongoose
  .connect(
    `mongodb+srv://therafiali:G7YrwaZ8Wc4003fm@cluster0.ruz4rnf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
`
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error);
  });

// Define a schema for the User collection
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

// Create a User model based on the schema
const User = mongoose.model("User", userSchema);

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware for JWT validation
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
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

// Route to register a new user
app.post("api/register", async (req, res) => {
  try {
    // Check if the email already exists
    const existingUser = await User.findOne({
      email: req.body.email,
    });

    if (existingUser) {
      return res.status(400).json({
        error: "Email already exists",
      });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to authenticate and log in a user
app.post("api/login", async (req, res) => {
  try {
    // Check if the email exists
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      return res.status(401).json({
        email: req.body.email,
      });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        email: user.email,
      },
      "secret"
    );

    res.status(200).json({
      token,
    });
  } catch (error) {
    res.status(500).json({
      error: "Interval server error",
      error,
    });
  }
});

// Protected route to get user details
app.get("api/user", verifyToken, async (req, res) => {
  try {
    // Fetch user details using decoded token
    const user = await User.findOne({
      email: req.user.email,
    });

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }
    res.status(200).json({
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
      error,
    });
  }
});

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to my user registration and login API");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

```
