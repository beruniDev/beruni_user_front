import { useQuery } from "@tanstack/react-query";
import apiClient from "src/main";
import { BookTypes } from "src/utils/types";

interface Params {
  title?: string;
  inventory_number?: string;
  author?: string;
  language?: string;
  subjects?: string;
  illustration?: string;
  enabled?: boolean;
  id?: number | string;
  page?: number;
  size?: number;
}

export const useBooks = (params: Params) => {
  return useQuery({
    queryKey: ["books", params],
    queryFn: () =>
      apiClient
        .get({ url: "/books", params })
        .then(({ data: response }) => response as BookTypes),
    enabled: params.enabled,
  });
};

export default useBooks;
