import { useMutation, useQuery } from "@tanstack/react-query";
import baseApi from "src/api/baseApi";
import { BookTypes, TelegraphBody, TelegraphRes } from "src/utils/types";

interface Params {
  id: number;
  enabled?: boolean;
}

export const getTelegraph = ({ enabled, id }: Params) => {
  return useQuery({
    queryKey: ["get-telegraph", id],
    queryFn: () =>
      baseApi
        .get(`/telegraph/${id}`)
        .then(({ data: response }) => response as TelegraphRes),
    enabled,
  });
};

export const editTelegraph = () => {
  return useMutation({
    mutationKey: ["edit-telegraph"],
    mutationFn: async ({ id, ...body }: TelegraphBody) => {
      const { data } = await baseApi.put(`/telegraph/${id}`, body);
      return data as TelegraphRes;
    },
  });
};
