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
                <span style={{ color: "#61dafb" }}>
                  👤 Welcome, {user.username}!
                </span>
              )}
              <button
                onClick={logout}
                style={{
                  backgroundColor: "transparent",
                  color: "#61dafb",
                  border: "1px solid #61dafb",
                  padding: "0.5rem 1rem",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                🚪 Logout
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", gap: "1rem" }}>
              <Link to="/login" className="nav-link">
                🔐 Login
              </Link>
              <Link to="/register" className="nav-link">
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
