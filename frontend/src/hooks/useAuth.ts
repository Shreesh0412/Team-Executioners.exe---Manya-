import { useQuery } from "@tanstack/react-query";

import { getCurrentUser } from "@/services";

import { storage } from "@/utils";

export function useAuth() {
  const token = storage.getToken();

  const {
    data,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["current-user"],

    queryFn: async () => {
      const response = await getCurrentUser();

      return response.data;
    },

    enabled: !!token,
  });

  return {
    user: data,

    token,

    isAuthenticated: !!token,

    isLoading,

    error,

    refetch,
  };
}