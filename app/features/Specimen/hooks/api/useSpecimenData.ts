import { useQuery } from "@tanstack/react-query";
import type { Specimen } from "types/api/Specimen";
import axiosInstance from "~/lib/axiosInstance";

const fetchSpecimens = async () => {
  const response = await axiosInstance.get<Specimen[]>("/test-specimens");
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
