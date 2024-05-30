import { useQuery } from "@tanstack/react-query";
import baseApi from "src/api/baseApi";

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
      baseApi
        .get("/user/get/create", { params: { phone_number } })
        .then(({ data: response }) => response as any),
    enabled,
  });
};

export default useUser;
