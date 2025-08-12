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

  const getStatusColor = (status) => {
    switch (status) {
      case "resolved":
        return "#4caf50";
      case "in-progress":
        return "#ff9800";
      case "rejected":
        return "#f44336";
      case "pending":
      default:
        return "#2196f3";
    }
  };

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <h2>⏳ Loading complaints...</h2>
        <p>Please wait while we fetch your data</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <h2>❌ Error loading complaints</h2>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>📋 All Complaints</h1>
      <p>Here are all complaints:</p>

      {complaints.length === 0 ? (
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <h3>No complaints found</h3>
          <p>Create your first complaint to get started!</p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gap: "1rem",
            marginTop: "1rem",
            gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
          }}
        >
          {complaints.map((complaint) => {
            const isUpdating = updatingComplaints.has(complaint._id);
            const currentStatus = complaint.process_status || "pending";

            return (
              <div
                key={complaint._id}
                style={{
                  border: "1px solid #ddd",
                  padding: "1.5rem",
                  borderRadius: "8px",
                  backgroundColor: "#f9f9f9",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                <h3 style={{ margin: "0 0 0.5rem 0", color: "#333" }}>
                  Complaint #{complaint._id.slice(-6)}
                </h3>
                <p style={{ margin: "0 0 1rem 0", color: "#666" }}>
                  {complaint.text}
                </p>

                <div style={{ marginBottom: "1rem" }}>
                  <span
                    style={{
                      padding: "0.5rem 1rem",
                      borderRadius: "20px",
                      backgroundColor: getStatusColor(currentStatus),
                      color: "white",
                      fontSize: "0.875rem",
                      fontWeight: "bold",
                    }}
                  >
                    {currentStatus.toUpperCase()}
                  </span>
                </div>

                <div style={{ marginBottom: "1rem" }}>
                  <label
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: "bold",
                      marginRight: "0.5rem",
                    }}
                  >
                    Update Status:
                  </label>
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
                    style={{
                      padding: "0.5rem",
                      borderRadius: "4px",
                      border: "1px solid #ddd",
                      fontSize: "0.875rem",
                      opacity: isUpdating ? 0.6 : 1,
                    }}
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>

                <div style={{ fontSize: "0.875rem", color: "#888" }}>
                  <p style={{ margin: "0.25rem 0" }}>
                    <strong>User ID:</strong> {complaint.user_id}
                  </p>
                  <p style={{ margin: "0.25rem 0" }}>
                    <strong>Created:</strong>{" "}
                    {new Date(complaint.createdAt).toLocaleDateString()}
                  </p>
                  {complaint.updatedAt &&
                    complaint.updatedAt !== complaint.createdAt && (
                      <p style={{ margin: "0.25rem 0" }}>
                        <strong>Updated:</strong>{" "}
                        {new Date(complaint.updatedAt).toLocaleDateString()}
                      </p>
                    )}
                </div>

                {isUpdating && (
                  <div
                    style={{
                      marginTop: "0.5rem",
                      fontSize: "0.875rem",
                      color: "#ff9800",
                    }}
                  >
                    ⏳ Updating status...
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
