import React from "react";
import { Link } from "@tanstack/react-router";
import { isAuthenticated } from "../hooks/useAuth";

const HomePage = () => {
  const authenticated = isAuthenticated();

  return (
    <div className="form-container">
      <div className="form-card">
        <h1 className="form-title">Welcome to Complaint Portal</h1>
        <p className="form-subtitle">
          A simple and efficient way to manage complaints
        </p>

        {authenticated ? (
          <div className="text-center">
            <div className="mb-24">
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: "500",
                  margin: "0 0 16px 0",
                }}
              >
                Quick Actions
              </h3>
              <div
                className="grid"
                style={{
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                }}
              >
                <Link
                  to="/complaints"
                  className="card"
                  style={{ textDecoration: "none", textAlign: "center" }}
                >
                  <div style={{ fontSize: "32px", marginBottom: "8px" }}>
                    📋
                  </div>
                  <h4 style={{ margin: "0 0 8px 0", color: "#202124" }}>
                    View Complaints
                  </h4>
                  <p
                    style={{ margin: "0", fontSize: "14px", color: "#5f6368" }}
                  >
                    See all complaints and their status
                  </p>
                </Link>

                <Link
                  to="/complaints/new"
                  className="card"
                  style={{ textDecoration: "none", textAlign: "center" }}
                >
                  <div style={{ fontSize: "32px", marginBottom: "8px" }}>
                    ➕
                  </div>
                  <h4 style={{ margin: "0 0 8px 0", color: "#202124" }}>
                    New Complaint
                  </h4>
                  <p
                    style={{ margin: "0", fontSize: "14px", color: "#5f6368" }}
                  >
                    Submit a new complaint
                  </p>
                </Link>
              </div>
            </div>

            <div className="text-muted">
              <p style={{ margin: "0", fontSize: "14px" }}>
                Use the navigation menu above to access different features
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="mb-24">
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: "500",
                  margin: "0 0 16px 0",
                }}
              >
                Get Started
              </h3>
              <p className="text-muted mb-24">
                Please login or register to access the complaint management
                system
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "16px",
                  justifyContent: "center",
                }}
              >
                <Link to="/login" className="btn btn-secondary">
                  🔐 Login
                </Link>
                <Link to="/register" className="btn">
                  📝 Register
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
