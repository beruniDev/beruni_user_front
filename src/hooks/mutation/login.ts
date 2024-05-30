import { useMutation } from "@tanstack/react-query";
import baseApi from "src/api/baseApi";

interface LoginTypes {
  access_token: string;
  token_type: string;
  status_user: string;
  success: boolean;
}

const loginMutation = () => {
  const contentType = "application/x-www-form-urlencoded";

  return useMutation({
    mutationKey: ["login"],
    mutationFn: (body: { username: string; password: string }) =>
      baseApi
        .post("/login", body, { headers: { "Content-Type": contentType } })
        .then(({ data }) => data as unknown as LoginTypes),
  });
};
export default loginMutation;
