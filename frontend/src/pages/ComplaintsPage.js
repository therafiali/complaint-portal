import React, { useState } from "react";
import {
  useComplaints,
  useUpdateComplaintStatus,
} from "../hooks/useComplaints";

const ComplaintsPage = () => {
  const { data, isLoading, error } = useComplaints();
  const complaints = data?.complaints || [];
  const updateStatus = useUpdateComplaintStatus();
  const [updatingComplaints, setUpdatingComplaints] = useState(new Set());

  const handleStatusUpdate = (complaintId, newStatus, currentStatus) => {
    // Don't update if the status is the same
    if (newStatus === currentStatus) {
      return;
    }

    // Add complaint to updating set
    setUpdatingComplaints((prev) => new Set(prev).add(complaintId));

    updateStatus.mutate(
      { id: complaintId, process_status: newStatus },
      {
        onSuccess: () => {
          console.log("Status updated successfully");
          // Remove from updating set
          setUpdatingComplaints((prev) => {
            const newSet = new Set(prev);
            newSet.delete(complaintId);
            return newSet;
          });
        },
        onError: (error) => {
          console.error("Error updating status:", error);
          // Remove from updating set
          setUpdatingComplaints((prev) => {
            const newSet = new Set(prev);
            newSet.delete(complaintId);
            return newSet;
          });
          // You could add a toast notification here
          alert(`Failed to update status: ${error.message}`);
        },
      }
    );
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "resolved":
        return "status-badge status-resolved";
      case "in-progress":
        return "status-badge status-in-progress";
      case "rejected":
        return "status-badge status-rejected";
      case "pending":
      default:
        return "status-badge status-pending";
    }
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <h2>Loading complaints...</h2>
        <p className="text-muted">Please wait while we fetch your data</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>❌ Error loading complaints</h2>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-24">
        <h1
          style={{ fontSize: "32px", fontWeight: "400", margin: "0 0 8px 0" }}
        >
          Complaints
        </h1>
        <p className="text-muted">
          Manage and track all complaints in the system
        </p>
      </div>

      {complaints.length === 0 ? (
        <div className="empty-state">
          <h3>No complaints found</h3>
          <p>Create your first complaint to get started!</p>
        </div>
      ) : (
        <div className="grid">
          {complaints.map((complaint) => {
            const isUpdating = updatingComplaints.has(complaint._id);
            const currentStatus = complaint.process_status || "pending";

            return (
              <div key={complaint._id} className="card">
                <div className="mb-16">
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: "500",
                      margin: "0 0 8px 0",
                      color: "#202124",
                    }}
                  >
                    Complaint #{complaint._id.slice(-6)}
                  </h3>
                  <p
                    style={{
                      margin: "0",
                      color: "#5f6368",
                      lineHeight: "1.5",
                    }}
                  >
                    {complaint.text}
                  </p>
                </div>

                <div className="mb-16">
                  <span className={getStatusClass(currentStatus)}>
                    {currentStatus}
                  </span>
                </div>

                <div className="mb-16">
                  <label className="form-label">Update Status:</label>
                  <select
                    value={currentStatus}
                    onChange={(e) =>
                      handleStatusUpdate(
                        complaint._id,
                        e.target.value,
                        currentStatus
                      )
                    }
                    disabled={isUpdating || updateStatus.isPending}
                    className="form-select"
                    style={{ width: "100%" }}
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>

                <div style={{ fontSize: "12px", color: "#9aa0a6" }}>
                  <p style={{ margin: "4px 0" }}>
                    <strong>User ID:</strong> {complaint.user_id}
                  </p>
                  <p style={{ margin: "4px 0" }}>
                    <strong>Created:</strong>{" "}
                    {new Date(complaint.createdAt).toLocaleDateString()}
                  </p>
                  {complaint.updatedAt &&
                    complaint.updatedAt !== complaint.createdAt && (
                      <p style={{ margin: "4px 0" }}>
                        <strong>Updated:</strong>{" "}
                        {new Date(complaint.updatedAt).toLocaleDateString()}
                      </p>
                    )}
                </div>

                {isUpdating && (
                  <div
                    className="mt-16"
                    style={{
                      fontSize: "12px",
                      color: "#f9ab00",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <div
                      className="loading-spinner"
                      style={{ width: "16px", height: "16px" }}
                    ></div>
                    Updating status...
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ComplaintsPage;
