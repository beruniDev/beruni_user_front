import { useMutation } from "@tanstack/react-query";
import apiClient from "src/main";

const filesMutation = () => {
  const contentType = "multipart/form-data";

  const config = { timeout: 1000000 };
  return useMutation({
    mutationKey: ["image_upload"],
    mutationFn: async (body: any) => {
      console.log(body, "body");
      const { data } = await apiClient.post({
        url: "/files",
        body,
        contentType,
        config,
      });
      return data as { files: string[] };
    },
  });
};
export default filesMutation;
