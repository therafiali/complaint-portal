import { Outlet, Link } from "@tanstack/react-router";
import { useCurrentUser, logout, isAuthenticated } from "./hooks/useAuth";
import "./App.css";

function App() {
  const { data: user, isLoading } = useCurrentUser();
  const authenticated = isAuthenticated();

  return (
    <div className="App">
      <header className="App-header">
        <nav>
          <Link to="/" className="nav-link">
            🏠 Home
          </Link>
          {authenticated && (
            <>
              <Link to="/complaints" className="nav-link">
                📋 Complaints
              </Link>
              <Link to="/complaints/new" className="nav-link">
                ➕ New Complaint
              </Link>
            </>
          )}
        </nav>

        <div className="auth-section">
          {authenticated ? (
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              {!isLoading && user && (
                <span style={{ color: "#5f6368", fontSize: "14px" }}>
                  👤 Welcome, {user.username}!
                </span>
              )}
              <button
                onClick={logout}
                className="btn btn-secondary"
                style={{ fontSize: "14px", padding: "8px 16px" }}
              >
                🚪 Logout
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", gap: "1rem" }}>
              <Link to="/login" className="btn btn-secondary">
                🔐 Login
              </Link>
              <Link to="/register" className="btn">
                📝 Register
              </Link>
            </div>
          )}
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
