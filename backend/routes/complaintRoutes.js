const express = require("express");
const {
  createComplaint,
  getComplaints,
  updateComplaintStatus,
} = require("../controllers/complaintController");
const verifyToken = require("../middleware");

const router = express.Router();

// Apply authentication middleware to all complaint routes
router.use(verifyToken);

router.post("/create", createComplaint);
router.get("/complaints", getComplaints);
router.put("/update-status", updateComplaintStatus);

module.exports = router;
