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
  name_title: "3_1",
  title_mono: "3_2",
  title_known: "3_3",
  // author_mono: "3_2",
  // commentator: "3_3",
  // commentator_mono: "3_4",
  // translator: "3_5",
  // translator_mono: "3_6",
  // compiler: "3_7",
  // compiler_mono: "3_8",
  date_written: "4",
  language: "5",
  subjects: "6",
  quantity_sheet: "7_1",
  quantity_ill: "7_2",
  // lines: "8_1",
  // columns: "8_2",
  // size: "9",
  // paper: "10",
  copyist: "8",
  copy_date: "9_1",
  copy_place: "9_2",
  type_handwriting: "10",
  // cover: "14",
  // cover_color: "15",
  // stamp: "16",
  // text_begin: "17_1",
  // text_exbegin: "17_2",
  // text_ammabegin: "17_3",
  // text_end: "17_4",
  // text_exend: "17_5",
  // colophon: "17_6",
  defects: "11",
  // fixation: "19",
  note: "12",
  // descript_auth: "21",
  // file: "file",
};

export const inputnames: any = {
  1: "1. Country",
  "1_1": "1.1 Country",
  "1_2": "1.2 Establishment/Institution",
  "1_3": "1.3 Collection, code",
  2: "2. Author",
  3: "3. Title",
  "3_1": "3.1. Title",
  "3_2": "3.2. Title as in manuscript",
  "3_3": "3.3. Known also as",
  // 3: "3. Author",
  // "3_1": "3.1. Author (name)",
  // "3_2": "3.2. Author (name) as in manuscript",
  // "3_3": "3.3. Commentator",
  // "3_4": "3.4. Commentator as in manuscript",
  // "3_5": "3.5. Translator",
  // "3_6": "3.6. Translator (name) as In manuscript",
  // "3_7": "3.7. Compiler",
  // "3_8": "3.8. Compiler (name) as in manuscript",
  4: "4. Date of writing",
  5: "5. Language",
  6: "6. Subject",
  7: "7. Quantity of sheets",
  "7_1": "7.1. Quantity of sheets",
  "7_2": "7.2. Available illustration",
  // 8: "8. Lines",
  8: "8. Copyist",
  // "8_1": "8.1. Quantity of lines",
  // "8_2": "8.2. Quantity of columns",
  // 9: "9. Size",
  // 10: "10. Paper",
  9: "9. Date, Place of Copying",
  "9_1": "9.1. Date of Copying",
  "9_2": "9.2. Place of Copying",
  10: "10. Handwriting kind",
  // 14: "14. Cover",
  // 15: "15. Cover color",
  // 16: "16. Stamp of bookbinder",
  // 17: "17. Text (partly)",
  // "17_1": "17.1. Beginning",
  // "17_2": "17.2. The existing beginning",
  // "17_3": "17.3. Beginning after amma ba'd",
  // "17_4": "17.4. End",
  // "17_5": "17.5. The existing end",
  // "17_6": "17.6. Colophon",
  11: "11. Defects",
  // 19: "19. Fixation in CBP",
  12: "12. Note",
  // 21: "21. Author of description",
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
  const extension = url.split(".").pop()?.toLowerCase();
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
