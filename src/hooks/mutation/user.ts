import { useMutation } from "@tanstack/react-query";
import baseApi from "src/api/baseApi";
import { errorToast } from "src/utils/toast";

interface Body {
  username: string;
  password: string;
  phone_number: string;
  role_id: number;
  full_name: string;
  status: number;

  id?: number;
}

const userMutation = () => {
  return useMutation({
    mutationKey: ["create_update_user"],
    mutationFn: (body: Body) => {
      if (body.id)
        return baseApi
          .put("/users", body)
          .then((res) => {
            if (res.status === 200) return res;
          })
          .catch((e) => errorToast(e.message));
      return baseApi.post("/user", body).then((res) => {
        if (res.status === 200) return res;
      });
    },

    onError: (e: any) =>
      errorToast(e.response?.data.detail ? e.response?.data.detail : e.message),
  });
};
export default userMutation;
