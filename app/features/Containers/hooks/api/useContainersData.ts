import { useQuery } from "@tanstack/react-query";
import type { Container } from "types/api/Container";
import axiosInstance from "~/lib/axiosInstance";

const fectchContainers = async () => {
  const response = await axiosInstance.get<Container[]>("/test-containers");
  return response.data;
};

export const ContainerQueryKeys = ["containers"];

export const useContainersData = () => {
  return useQuery({
    queryKey: ContainerQueryKeys,
    queryFn: fectchContainers,
    staleTime: 5 * 60 * 1000, // Data considered fresh for 5 minutes
    retry: 1, // Only retry once if the request fails
  });
};
