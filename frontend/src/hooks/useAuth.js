import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

// API base URL - adjust this to match your backend
const API_BASE_URL = "http://localhost:3000/api";

// Helper function to make API calls
const apiCall = async (endpoint, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Something went wrong");
  }

  return data;
};

// Register user
const registerUser = async (userData) => {
  return apiCall("/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });
};

// Login user
const loginUser = async (credentials) => {
  const data = await apiCall("/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

  // Store token in localStorage
  if (data.token) {
    localStorage.setItem("authToken", data.token);
  }

  return data;
};

// Reset password
const resetPassword = async (resetData) => {
  return apiCall("/reset", {
    method: "POST",
    body: JSON.stringify(resetData),
  });
};

// Get current user
const getCurrentUser = async () => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    throw new Error("No authentication token");
  }

  return apiCall("/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Custom hooks
export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      // Navigate to login page after successful registration
      navigate({ to: "/login" });
    },
  });
};

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      // Invalidate and refetch user data
      queryClient.invalidateQueries({ queryKey: ["user"] });
      // Navigate to home page after successful login
      navigate({ to: "/" });
    },
  });
};

export const useResetPassword = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      // Navigate to login page after successful password reset
      navigate({ to: "/login" });
    },
  });
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Utility functions
export const logout = () => {
  localStorage.removeItem("authToken");
  window.location.href = "/login";
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("authToken");
};
