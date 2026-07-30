import { useQuery } from "@tanstack/react-query";

import { getCurrentUser } from "@/services";

export function useUser() {
  return useQuery({
    queryKey: ["user"],

    queryFn: async () => {
      const response = await getCurrentUser();

      return response.data;
    },
  });
}