import { useQuery } from "@tanstack/react-query";
import baseApi from "src/api/baseApi";
import { BookTypes } from "src/utils/types";

interface Params {
  text: string;
  enabled?: boolean;
}

export const useBookSearch = ({ text, enabled }: Params) => {
  return useQuery({
    queryKey: ["books_search", text],
    queryFn: () =>
      baseApi
        .get("/books/search", { params: { data: text } })
        .then(({ data: response }) => response as BookTypes),
    enabled: enabled,
  });
};

export default useBookSearch;
