import { useMutation } from "@tanstack/react-query";
import apiClient from "src/main";

interface bookBody {
  inventory_number: string;
  title: string;
  title_mono: string;
  title_known: string;
  author: string;
  author_mono: string;
  commentator: string;
  commentator_mono: string;
  translator: string;
  translator_mono: string;
  compiler: string;
  compiler_mono: string;
  date_written: string;
  language: string;
  subjects: string;
  quantity_sheet: string;
  quantity_ill: string;
  lines: string;
  columns: string;
  size: string;
  paper: string;
  copyist: string;
  copy_date: string;
  copy_place: string;
  type_handwriting: string;
  cover: string;
  cover_color: string;
  stamp: string;
  text_begin: string;
  text_exbegin: string;
  text_ammabegin: string;
  text_end: string;
  text_exend: string;
  colophon: string;
  defects: string;
  fixation: string;
  note: string;
  descript_auth: string;

  file: any;
  images: string[];

  id?: number;
}

const bookMutation = () => {
  const contentType = "multipart/form-data";

  const config = { timeout: 1000000 };
  return useMutation({
    mutationKey: ["post_book"],
    mutationFn: async ({ body, params }: { body: bookBody; params: any }) => {
      if (body.id) {
        const { data } = await apiClient.put({
          url: "/books",
          body,
          params,
          contentType,
          config,
        });
        return data;
      } else {
        const { data } = await apiClient.post({
          url: "/books",
          body,
          params,
          contentType,
          config,
        });
        return data;
      }
    },
  });
};
export default bookMutation;
