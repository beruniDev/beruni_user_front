import { QueryClient } from "@tanstack/react-query";
import { EPresetTimes } from "./types";
import useQueryString from "src/hooks/useQueryString";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      // cacheTime: EPresetTimes.MINUTE * 5,
      staleTime: EPresetTimes.MINUTE * 5,
    },
  },
});

export const itemsPerPage = 50;

export const bookValues = {
  inventory_number: "1_1",
  size: "1_2", // establishment
  paper: "1_3", // collection
  author: "2",
  title: "3_1",
  title_mono: "3_2",
  title_known: "3_3",
  date_written: "4",
  language: "5",
  subjects: "6",
  quantity_sheet: "7_1",
  quantity_ill: "7_2",
  copyist: "8",
  copy_date: "9_1",
  copy_place: "9_2",
  type_handwriting: "10",
  defects: "11",
  note: "12",
};

export const handleIdx = (index: number) => {
  const currentPage = Number(useQueryString("page")) || 1;
  if (currentPage === 1) return index + 1;
  else return index + 1 + itemsPerPage * (currentPage - 1);
};
export const imageConverter = (img: File) => {
  if (img?.size) return URL.createObjectURL(img);
  return "";
};

export enum FileType {
  other = "other",
  video = "video",
  photo = "photo",
}

export const isMobile = window.innerWidth < 960;

export const detectFileType = (url: string) => {
  const extension = url?.split(".").pop()?.toLowerCase();
  const imageExtensions = [
    "jpg",
    "jpeg",
    "png",
    "gif",
    "bmp",
    "HEIC",
    "IMG",
    "TIFF",
    "svg",
  ];
  const videoExtensions = ["mp4", "avi", "mkv", "mov", "webm"];

  if (extension && imageExtensions.includes(extension)) {
    return FileType.photo;
  } else if (extension && videoExtensions.includes(extension)) {
    return FileType.video;
  } else {
    return FileType.other;
  }
};
