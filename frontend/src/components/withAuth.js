import React from "react";
import AuthMiddleware from "./AuthMiddleware";

// Higher-Order Component for protecting routes
export const withAuth = (Component, requireAuth = true) => {
  const ProtectedComponent = (props) => {
    return (
      <AuthMiddleware requireAuth={requireAuth}>
        <Component {...props} />
      </AuthMiddleware>
    );
  };

  // Copy display name for debugging
  ProtectedComponent.displayName = `withAuth(${
    Component.displayName || Component.name
  })`;

  return ProtectedComponent;
};

// Higher-Order Component for public routes (redirects authenticated users)
export const withPublicAuth = (Component) => {
  return withAuth(Component, false);
};

// Higher-Order Component for private routes (requires authentication)
export const withPrivateAuth = (Component) => {
  return withAuth(Component, true);
};
