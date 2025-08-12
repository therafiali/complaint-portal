import React from "react";

const HomePage = () => {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>🏠 Welcome to Complaint Portal</h1>
      <p>This is your home page</p>
      <div style={{ marginTop: "2rem" }}>
        <h3>Quick Actions:</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>📋 View all complaints</li>
          <li>➕ Create new complaint</li>
          <li>🔍 Search complaints</li>
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
