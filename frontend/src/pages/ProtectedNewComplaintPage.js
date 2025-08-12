import React from "react";
import AuthMiddleware from "../components/AuthMiddleware";
import NewComplaintPage from "./NewComplaintPage";

const ProtectedNewComplaintPage = () => {
  return (
    <AuthMiddleware requireAuth={true}>
      <NewComplaintPage />
    </AuthMiddleware>
  );
};

export default ProtectedNewComplaintPage;
