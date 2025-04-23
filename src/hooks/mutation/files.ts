import { useMutation } from "@tanstack/react-query";
import baseApi from "src/api/baseApi";

const filesMutation = () => {
  const contentType = "multipart/form-data";

  return useMutation({
    mutationKey: ["image_upload"],
    mutationFn: async (body: any) => {
      const { data } = await baseApi.post("/files", body, {
        headers: { "Content-Type": contentType },
      });
      return data as { files: string[] };
    },
  });
};
export default filesMutation;
