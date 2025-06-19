import { useQuery } from "@tanstack/react-query";
import axiosInstance from "~/lib/axiosInstance";

export interface SpecimenData {
  id: string;
  name: string;
}

const fetchSpecimens = async () => {
  const response = await axiosInstance.get<SpecimenData[]>("/test-specimens");
  return response.data;
};

export const SpecimensQueryKey = ["specimens"];

export function useSpecimensData() {
  return useQuery({
    queryKey: SpecimensQueryKey,
    queryFn: fetchSpecimens,
    staleTime: 5 * 60 * 1000,
  });
}
