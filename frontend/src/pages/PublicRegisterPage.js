import React from "react";
import AuthMiddleware from "../components/AuthMiddleware";
import RegisterPage from "./RegisterPage";

const PublicRegisterPage = () => {
  return (
    <AuthMiddleware requireAuth={false}>
      <RegisterPage />
    </AuthMiddleware>
  );
};

export default PublicRegisterPage;
