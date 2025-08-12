import React from "react";
import { useNavigate } from "@tanstack/react-router";
import { useCurrentUser, isAuthenticated } from "../hooks/useAuth";

const AuthMiddleware = ({ children, requireAuth = true }) => {
  const navigate = useNavigate();
  const { data: user, isLoading, error } = useCurrentUser();
  const hasToken = isAuthenticated();

  React.useEffect(() => {
    // If route requires authentication but user is not authenticated
    if (requireAuth && !hasToken) {
      navigate({ to: "/login" });
      return;
    }

    // If user has token but there's an error (invalid/expired token)
    // Only logout if it's a 401 error (unauthorized)
    if (hasToken && error && error.message?.includes("401")) {
      // Clear invalid token
      localStorage.removeItem("authToken");
      navigate({ to: "/login" });
      return;
    }

    // If user is authenticated and tries to access login/register pages
    if (!requireAuth && hasToken && user) {
      navigate({ to: "/" });
      return;
    }
  }, [requireAuth, hasToken, error, user, navigate]);

  // Show loading while checking authentication
  if (hasToken && isLoading) {
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
          <h2>⏳ Loading...</h2>
          <p>Verifying your authentication...</p>
        </div>
      </div>
    );
  }

  // Show error if token is invalid (only for 401 errors)
  if (hasToken && error && error.message?.includes("401")) {
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
          <h2>❌ Authentication Error</h2>
          <p>Your session has expired. Please login again.</p>
          <p>Redirecting to login...</p>
        </div>
      </div>
    );
  }

  // Show access restricted for protected routes
  if (requireAuth && !hasToken) {
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

  // Render the content
  return children;
};

export default AuthMiddleware;
