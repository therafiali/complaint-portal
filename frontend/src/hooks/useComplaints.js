import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Mock API functions - replace these with your actual API calls
const fetchComplaints = async () => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return [
    {
      id: 1,
      title: "Service Issue",
      description: "Poor customer service",
      status: "pending",
    },
    {
      id: 2,
      title: "Product Problem",
      description: "Defective product received",
      status: "resolved",
    },
    {
      id: 3,
      title: "Billing Error",
      description: "Incorrect charges on bill",
      status: "in-progress",
    },
  ];
};

const createComplaint = async (complaint) => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { id: Date.now(), ...complaint, status: "pending" };
};

// Custom hook for fetching complaints
export const useComplaints = () => {
  return useQuery({
    queryKey: ["complaints"],
    queryFn: fetchComplaints,
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
        return oldData ? [...oldData, newComplaint] : [newComplaint];
      });
    },
  });
};
