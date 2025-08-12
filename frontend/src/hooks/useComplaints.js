import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// API base URL - adjust this to match your backend
const API_BASE_URL = "http://localhost:3000/api";

// Helper function to make API calls with authentication
const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem("authToken");

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
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

// Fetch complaints from backend
const fetchComplaints = async () => {
  return apiCall("/complaints");
};

// Create complaint using backend API
const createComplaint = async (complaintData) => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    throw new Error("Authentication required");
  }

  return apiCall("/create", {
    method: "POST",
    body: JSON.stringify({
      text: complaintData.description, // Using description as text field
    }),
  });
};

// Update complaint status using backend API
const updateComplaintStatus = async ({ id, process_status }) => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    throw new Error("Authentication required");
  }

  console.log("Updating complaint status:", { id, process_status });

  try {
    const response = await apiCall("/update-status", {
      method: "PUT",
      body: JSON.stringify({
        id: id,
        process_status: process_status,
      }),
    });

    console.log("Status update response:", response);
    return response;
  } catch (error) {
    console.error("Error in updateComplaintStatus:", error);
    throw error;
  }
};

// Custom hook for fetching complaints
export const useComplaints = () => {
  return useQuery({
    queryKey: ["complaints"],
    queryFn: fetchComplaints,
    retry: 1, // Allow 1 retry
    retryDelay: 1000, // Wait 1 second before retry
    staleTime: 1000 * 60 * 5, // 5 minutes
    onError: (error) => {
      // Log error but don't trigger logout
      console.error("Error fetching complaints:", error);
    },
  });
};

// Custom hook for creating a complaint
export const useCreateComplaint = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createComplaint,
    onSuccess: (newComplaint) => {
      // Invalidate and refetch complaints after creating a new one
      queryClient.invalidateQueries({ queryKey: ["complaints"] });

      // Optionally, you can also update the cache directly
      queryClient.setQueryData(["complaints"], (oldData) => {
        if (!oldData) {
          return { complaints: [newComplaint.complaint] };
        }

        // Check if oldData has the correct structure
        if (oldData.complaints && Array.isArray(oldData.complaints)) {
          return {
            ...oldData,
            complaints: [newComplaint.complaint, ...oldData.complaints],
          };
        }

        // If structure is unexpected, just return the old data
        return oldData;
      });
    },
  });
};

// Custom hook for updating complaint status
export const useUpdateComplaintStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateComplaintStatus,
    onSuccess: (updatedComplaint) => {
      // Invalidate and refetch complaints after updating
      queryClient.invalidateQueries({ queryKey: ["complaints"] });

      // Optionally, you can also update the cache directly
      queryClient.setQueryData(["complaints"], (oldData) => {
        if (
          !oldData ||
          !oldData.complaints ||
          !Array.isArray(oldData.complaints)
        ) {
          return oldData;
        }

        return {
          ...oldData,
          complaints: oldData.complaints.map((complaint) =>
            complaint._id === updatedComplaint.complaint._id
              ? updatedComplaint.complaint
              : complaint
          ),
        };
      });
    },
  });
};
