import { useQuery } from "@tanstack/react-query";
import baseApi from "src/api/baseApi";
import { BookTypes } from "src/utils/types";

interface Params {
  title?: string;
  inventory_number?: string | number;
  author?: string;
  language?: string;
  subjects?: string;
  illustration?: string;
  enabled?: boolean;
  id?: number | string;
  page?: number;
  size?: string | number;
}

export const useBooks = ({ enabled, ...params }: Params) => {
  return useQuery({
    queryKey: ["books", params],
    queryFn: () =>
      baseApi
        .get("/books", { params })
        .then(({ data: response }) => response as BookTypes),
    enabled,
  });
};

export default useBooks;
