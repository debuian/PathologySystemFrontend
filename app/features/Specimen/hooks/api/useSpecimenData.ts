import { useQuery } from "@tanstack/react-query";
import axiosInstance from "~/lib/axiosInstance";

export interface SpecimenData {
  id: string;
  name: string;
  storage: string;
}

const fetchSpecimens = async () => {
  const response = await axiosInstance.get<SpecimenData[]>("/specimens");
  return response.data;
};

export const SpecimensQueryKey = ["specimens"];

export function useSpecimensData() {
  return useQuery({
    queryKey: SpecimensQueryKey,
    queryFn: fetchSpecimens,
    staleTime: 5 * 60 * 1000, // Data considered fresh for 5 minutes
  });
}
