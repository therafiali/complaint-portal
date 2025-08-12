const Complaint = require("../models/complaint");

exports.createComplaint = async (req, res) => {
  try {
    const { text } = req.body;
    const user_id = req.user.id || req.user._id; // Get user ID from authenticated request

    // Validate required fields
    if (!text) {
      return res.status(400).json({
        error: "text is a required field",
      });
    }

    // Create new complaint using Mongoose
    const newComplaint = new Complaint({
      user_id: user_id,
      text: text,
      process_status: "pending",
    });

    // Save the complaint to database
    const savedComplaint = await newComplaint.save();

    // Send success response
    res.status(201).json({
      message: "Complaint created successfully",
      complaint: savedComplaint,
    });
  } catch (error) {
    console.error("Error creating complaint:", error);
    res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
};

exports.getComplaints = async (req, res) => {
  try {
    // Fetch all complaints from database
    const complaints = await Complaint.find({}).sort({ createdAt: -1 });

    // Send success response
    res.status(200).json({
      complaints: complaints,
    });
  } catch (error) {
    console.error("Error fetching complaints:", error);
    res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
};

exports.updateComplaintStatus = async (req, res) => {
  try {
    const { id, process_status } = req.body;

    // Validate required fields
    if (!id || !process_status) {
      return res.status(400).json({
        error: "id and process_status are required fields",
      });
    }

    // Validate process_status values
    const validStatuses = ["pending", "in-progress", "resolved", "rejected"];
    if (!validStatuses.includes(process_status)) {
      return res.status(400).json({
        error:
          "process_status must be one of: pending, in-progress, resolved, rejected",
      });
    }

    // Update complaint using Mongoose
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      id,
      { process_status: process_status },
      { new: true } // Return the updated document
    );

    if (!updatedComplaint) {
      return res.status(404).json({
        error: "Complaint not found",
      });
    }

    // Send success response
    res.status(200).json({
      message: "Complaint status updated successfully",
      complaint: updatedComplaint,
    });
  } catch (error) {
    console.error("Error updating complaint status:", error);
    res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
};
