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
    <div className="form-container">
      <div className="form-card">
        <h1 className="form-title">Create New Complaint</h1>
        <p className="form-subtitle">
          Fill out the form below to submit a new complaint
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Complaint Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="form-input"
              placeholder="Enter complaint title..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows="5"
              className="form-input form-textarea"
              placeholder="Describe your complaint in detail..."
            />
          </div>

          <button
            type="submit"
            disabled={createComplaint.isPending}
            className="btn"
            style={{ width: "100%" }}
          >
            {createComplaint.isPending ? (
              <>
                <div
                  className="loading-spinner"
                  style={{ width: "16px", height: "16px" }}
                ></div>
                Submitting...
              </>
            ) : (
              "Submit Complaint"
            )}
          </button>
        </form>

        {createComplaint.isError && (
          <div className="error-container mt-16">
            ❌ Error: {createComplaint.error.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewComplaintPage;
