import { useQuery } from "@tanstack/react-query";
import apiClient from "src/main";

export const useBooks = ({
  enabled = true,
  phone_number,
  page,
}: {
  enabled?: boolean;
  phone_number?: string;
  page?: number;
}) => {
  return useQuery({
    queryKey: ["books", page],
    queryFn: () =>
      apiClient
        .get({ url: "/user/get/create", params: { phone_number, page } })
        .then(({ data: response }) => response as any),
    enabled,
  });
};

export default useBooks;
