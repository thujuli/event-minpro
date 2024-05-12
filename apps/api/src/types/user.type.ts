export type UniqueUserField = {
  id?: number;
  username?: string;
  email?: string;
  referralCode?: string;
};

export type UserEventQuery = {
  name?: string;
  page?: string | number;
  limit?: string | number;
  sort_by?: string;
  order_by?: string;
};

export type UserEventTransactionQuery = {
  page?: string | number;
  limit?: string | number;
  sort_by?: string;
  order_by?: string;
};
