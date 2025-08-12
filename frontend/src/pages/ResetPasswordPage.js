import React, { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useResetPassword } from "../hooks/useAuth";

const ResetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const resetPassword = useResetPassword();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    resetPassword.mutate({ email, newpassword: newPassword });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
        padding: "2rem",
      }}
    >
      <div
        style={{
          maxWidth: "400px",
          width: "100%",
          padding: "2rem",
          border: "1px solid #ddd",
          borderRadius: "8px",
          backgroundColor: "white",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
          🔑 Reset Password
        </h1>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1.5rem" }}>
            <label
              htmlFor="email"
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: "bold",
              }}
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "1rem",
              }}
              placeholder="Enter your email..."
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label
              htmlFor="newPassword"
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: "bold",
              }}
            >
              New Password:
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "1rem",
              }}
              placeholder="Enter new password..."
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label
              htmlFor="confirmPassword"
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: "bold",
              }}
            >
              Confirm New Password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "1rem",
              }}
              placeholder="Confirm new password..."
            />
          </div>

          <button
            type="submit"
            disabled={resetPassword.isPending}
            style={{
              width: "100%",
              backgroundColor: "#ffc107",
              color: "#212529",
              padding: "0.75rem",
              border: "none",
              borderRadius: "4px",
              fontSize: "1rem",
              cursor: resetPassword.isPending ? "not-allowed" : "pointer",
              opacity: resetPassword.isPending ? 0.6 : 1,
              marginBottom: "1rem",
            }}
          >
            {resetPassword.isPending
              ? "⏳ Resetting password..."
              : "🔑 Reset Password"}
          </button>
        </form>

        {resetPassword.isError && (
          <div
            style={{
              padding: "1rem",
              backgroundColor: "#f8d7da",
              color: "#721c24",
              borderRadius: "4px",
              border: "1px solid #f5c6cb",
              marginBottom: "1rem",
            }}
          >
            ❌ {resetPassword.error.message}
          </div>
        )}

        {resetPassword.isSuccess && (
          <div
            style={{
              padding: "1rem",
              backgroundColor: "#d4edda",
              color: "#155724",
              borderRadius: "4px",
              border: "1px solid #c3e6cb",
              marginBottom: "1rem",
            }}
          >
            ✅ Password reset successfully! You can now login with your new
            password.
          </div>
        )}

        <div style={{ textAlign: "center" }}>
          <p>
            Remember your password?{" "}
            <Link
              to="/login"
              style={{ color: "#007bff", textDecoration: "none" }}
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
