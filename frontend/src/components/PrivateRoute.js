import React from "react";
import { useNavigate } from "@tanstack/react-router";
import { isAuthenticated } from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const authenticated = isAuthenticated();

  React.useEffect(() => {
    if (!authenticated) {
      // Redirect to login if not authenticated
      navigate({ to: "/login" });
    }
  }, [authenticated, navigate]);

  // Show loading while checking authentication
  if (!authenticated) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h2>🔒 Access Restricted</h2>
          <p>Please login to access this page</p>
          <p>Redirecting to login...</p>
        </div>
      </div>
    );
  }

  // Render the protected content if authenticated
  return children;
};

export default PrivateRoute;
