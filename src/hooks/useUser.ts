import { useQuery } from "@tanstack/react-query";
import apiClient from "src/main";

export const useUser = ({
  enabled = true,
  phone_number,
}: {
  enabled?: boolean;
  phone_number: string;
}) => {
  return useQuery({
    queryKey: ["get_create_user"],
    queryFn: () =>
      apiClient
        .get({ url: "/user/get/create", params: { phone_number } })
        .then(({ data: response }) => response as any),
    enabled,
  });
};

export default useUser;
