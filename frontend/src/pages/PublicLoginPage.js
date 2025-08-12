import React from "react";
import AuthMiddleware from "../components/AuthMiddleware";
import LoginPage from "./LoginPage";

const PublicLoginPage = () => {
  return (
    <AuthMiddleware requireAuth={false}>
      <LoginPage />
    </AuthMiddleware>
  );
};

export default PublicLoginPage;
