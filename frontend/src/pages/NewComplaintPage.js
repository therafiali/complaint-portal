import React, { useState } from "react";
import { useCreateComplaint } from "../hooks/useComplaints";
import { useNavigate } from "@tanstack/react-router";

const NewComplaintPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const createComplaint = useCreateComplaint();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    createComplaint.mutate(
      { title, description },
      {
        onSuccess: () => {
          // Navigate back to complaints list after successful creation
          navigate({ to: "/complaints" });
        },
      }
    );
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h1>➕ Create New Complaint</h1>
      <p>Fill out the form below to submit a new complaint:</p>

      <form onSubmit={handleSubmit} style={{ marginTop: "2rem" }}>
        <div style={{ marginBottom: "1.5rem" }}>
          <label
            htmlFor="title"
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "bold",
            }}
          >
            Complaint Title:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "0.75rem",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "1rem",
            }}
            placeholder="Enter complaint title..."
          />
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label
            htmlFor="description"
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "bold",
            }}
          >
            Description:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows="5"
            style={{
              width: "100%",
              padding: "0.75rem",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "1rem",
              resize: "vertical",
            }}
            placeholder="Describe your complaint in detail..."
          />
        </div>

        <button
          type="submit"
          disabled={createComplaint.isPending}
          style={{
            backgroundColor: "#007bff",
            color: "white",
            padding: "0.75rem 2rem",
            border: "none",
            borderRadius: "4px",
            fontSize: "1rem",
            cursor: createComplaint.isPending ? "not-allowed" : "pointer",
            opacity: createComplaint.isPending ? 0.6 : 1,
          }}
        >
          {createComplaint.isPending
            ? "⏳ Submitting..."
            : "📤 Submit Complaint"}
        </button>
      </form>

      {createComplaint.isError && (
        <div
          style={{
            marginTop: "1rem",
            padding: "1rem",
            backgroundColor: "#f8d7da",
            color: "#721c24",
            borderRadius: "4px",
            border: "1px solid #f5c6cb",
          }}
        >
          ❌ Error: {createComplaint.error.message}
        </div>
      )}
    </div>
  );
};

export default NewComplaintPage;
