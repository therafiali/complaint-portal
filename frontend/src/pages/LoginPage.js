import React, { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useLogin } from "../hooks/useAuth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login.mutate({ email, password });
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
        <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>🔐 Login</h1>

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
              htmlFor="password"
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: "bold",
              }}
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "1rem",
              }}
              placeholder="Enter your password..."
            />
          </div>

          <button
            type="submit"
            disabled={login.isPending}
            style={{
              width: "100%",
              backgroundColor: "#007bff",
              color: "white",
              padding: "0.75rem",
              border: "none",
              borderRadius: "4px",
              fontSize: "1rem",
              cursor: login.isPending ? "not-allowed" : "pointer",
              opacity: login.isPending ? 0.6 : 1,
              marginBottom: "1rem",
            }}
          >
            {login.isPending ? "⏳ Logging in..." : "🚀 Login"}
          </button>
        </form>

        {login.isError && (
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
            ❌ {login.error.message}
          </div>
        )}

        <div style={{ textAlign: "center" }}>
          <p style={{ marginBottom: "0.5rem" }}>
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{ color: "#007bff", textDecoration: "none" }}
            >
              Register here
            </Link>
          </p>
          <p>
            <Link
              to="/reset-password"
              style={{ color: "#007bff", textDecoration: "none" }}
            >
              Forgot your password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
