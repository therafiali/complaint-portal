const mongoose = require("mongoose");

// Connect to MongoDB database

const connectDB = async () => {
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
};

module.exports = connectDB;
