import React from "react";
import { useComplaints } from "../hooks/useComplaints";

const ComplaintsPage = () => {
  const { data: complaints, isLoading, error } = useComplaints();

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
      <p>Here are all your complaints:</p>

      <div
        style={{
          display: "grid",
          gap: "1rem",
          marginTop: "1rem",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        }}
      >
        {complaints?.map((complaint) => (
          <div
            key={complaint.id}
            style={{
              border: "1px solid #ddd",
              padding: "1.5rem",
              borderRadius: "8px",
              backgroundColor: "#f9f9f9",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <h3 style={{ margin: "0 0 0.5rem 0", color: "#333" }}>
              {complaint.title}
            </h3>
            <p style={{ margin: "0 0 1rem 0", color: "#666" }}>
              {complaint.description}
            </p>
            <span
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "20px",
                backgroundColor:
                  complaint.status === "resolved"
                    ? "#4caf50"
                    : complaint.status === "in-progress"
                    ? "#ff9800"
                    : "#f44336",
                color: "white",
                fontSize: "0.875rem",
                fontWeight: "bold",
              }}
            >
              {complaint.status.toUpperCase()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComplaintsPage;
