import React from "react";
import AuthMiddleware from "../components/AuthMiddleware";
import ComplaintsPage from "./ComplaintsPage";

const ProtectedComplaintsPage = () => {
  return (
    <AuthMiddleware requireAuth={true}>
      <ComplaintsPage />
    </AuthMiddleware>
  );
};

export default ProtectedComplaintsPage;
