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
