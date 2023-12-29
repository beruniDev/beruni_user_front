import { QueryClient } from "@tanstack/react-query";
import { EPresetTimes } from "./types";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      // cacheTime: EPresetTimes.MINUTE * 5,
      staleTime: EPresetTimes.MINUTE * 5,
    },
  },
});

export const bookValues = {
  inventory_number: 1,
  title: "2_1",
  title_mono: "2_2",
  title_known: "2_3",
  author: "3_1",
  author_mono: "3_2",
  commentator: "3_3",
  commentator_mono: "3_4",
  translator: "3_5",
  translator_mono: "3_6",
  compiler: "3_7",
  compiler_mono: "3_8",
  date_written: "4",
  language: "5",
  subjects: "6",
  quantity_sheet: "7_1",
  quantity_ill: "7_2",
  lines: "8_1",
  columns: "8_2",
  size: "9",
  paper: "10",
  copyist: "11",
  copy_date: "12_1",
  copy_place: "12_2",
  type_handwriting: "13",
  cover: "14",
  cover_color: "15",
  stamp: "16",
  text_begin: "17_1",
  text_exbegin: "17_2",
  text_ammabegin: "17_3",
  text_end: "17_4",
  text_exend: "17_5",
  colophon: "17_6",
  defects: "18",
  fixation: "19",
  note: "20",
  descript_auth: "21",
  file: "file",
};
