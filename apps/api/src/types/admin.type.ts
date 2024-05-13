export type AdminEventQuery = {
  name?: string;
  page?: string | number;
  limit?: string | number;
  sort_by?: string;
  order_by?: string;
};

export type AdminEventTransactionQuery = {
  page?: string | number;
  limit?: string | number;
  sort_by?: string;
  order_by?: string;
};
