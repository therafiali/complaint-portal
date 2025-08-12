import React from "react";
import AuthMiddleware from "../components/AuthMiddleware";
import ResetPasswordPage from "./ResetPasswordPage";

const PublicResetPasswordPage = () => {
  return (
    <AuthMiddleware requireAuth={false}>
      <ResetPasswordPage />
    </AuthMiddleware>
  );
};

export default PublicResetPasswordPage;
