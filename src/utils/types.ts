export interface BasePaginatedRes {
  total: number;
  page: number;
  size: number;
  pages: number;
}

export enum EPresetTimes {
  SECOND = 1000,
  MINUTE = SECOND * 60,
  HOUR = MINUTE * 60,
  DAY = HOUR * 24,
  WEEK = DAY * 7,
  TEN_DAYS = DAY * 10,
}

export interface BasePaginatedRes {
  total: number;
  page: number;
  size: number;
  pages: number;
  items: any[];
}

export interface MeTypes {
  user: {
    username: string;
    status: number;
    created_at: string;
    full_name: string;
    is_client: number;
    id: number;
    role_id: number;
    phone_number: string;
    user_role: any;
  };
  permissions: { [key: number]: boolean };
}

export interface BookType {
  id: number;
  user_id: number;
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
  lines: number;
  columns: number;
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
  created_at: string;
  images: string[];
  inventory_number: string;
}
export interface BookTypes extends BasePaginatedRes {
  items: BookType[];
}
