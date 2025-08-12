import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useCurrentUser, isAuthenticated } from "./useAuth";

export const useRouteGuard = (requireAuth = true) => {
  const navigate = useNavigate();
  const { data: user, isLoading, error } = useCurrentUser();
  const hasToken = isAuthenticated();

  useEffect(() => {
    // If route requires authentication but user is not authenticated
    if (requireAuth && !hasToken) {
      navigate({ to: "/login" });
      return;
    }

    // If user has token but there's an error (invalid/expired token)
    if (hasToken && error) {
      // Clear invalid token
      localStorage.removeItem("authToken");
      navigate({ to: "/login" });
      return;
    }

    // If user is authenticated and tries to access login/register pages
    if (!requireAuth && hasToken && user) {
      navigate({ to: "/" });
      return;
    }
  }, [requireAuth, hasToken, error, user, navigate]);

  return {
    isAuthenticated: hasToken,
    isLoading: hasToken && isLoading,
    hasError: hasToken && error,
    user,
  };
};

// Hook for protected routes
export const useProtectedRoute = () => {
  return useRouteGuard(true);
};

// Hook for public routes (redirects authenticated users)
export const usePublicRoute = () => {
  return useRouteGuard(false);
};
