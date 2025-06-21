import { useQuery } from "@tanstack/react-query";
import axiosInstance from "~/lib/axiosInstance";

export const ResultValueTypesQueryKey = ["result", "value", "types"] as const;
export interface ResultValueType {
  id: number;
  name: string;
}
export const useResultValueTypeData = () => {
  const fetchResultValueTypes = async () => {
    const response = await axiosInstance.get<ResultValueType[]>(
      "/test-result-value-types"
    );
    console.log("Fetched Result Value Types:", response.data);

    return response.data;
  };

  return useQuery({
    queryKey: ResultValueTypesQueryKey,
    queryFn: fetchResultValueTypes,
    staleTime: 5 * 60 * 1000, // Data considered fresh for 5 minutes
    retry: 1, // Only retry once if the request fails
  });
};
