const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    user_id: String,
    text: String,
    process_status: {
      type: String,
      enum: ["pending", "in-progress", "resolved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true, // This adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("Complaint", complaintSchema);
