import { useQuery } from "@tanstack/react-query";
import apiClient from "src/main";
import { BookTypes } from "src/utils/types";

interface Params {
  text: string;
  enabled?: boolean;
}

export const useBookSearch = ({ text, enabled }: Params) => {
  return useQuery({
    queryKey: ["books_search", text],
    queryFn: () =>
      apiClient
        .get({ url: "/books/search", params: { data: text } })
        .then(({ data: response }) => response as BookTypes),
    enabled: enabled,
  });
};

export default useBookSearch;
