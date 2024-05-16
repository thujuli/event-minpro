import { NEXT_PUBLIC_BASE_API_URL } from "@/lib/env";
import {
  AdminEventResponse,
  AdminEventTransactionResponse,
} from "@/types/admin";
import {
  Pagination,
  ResponseDataPagination,
  ResponseWithoutData,
} from "@/types/global";
import axios from "axios";

export const getAdminEventTransactions = async (
  token: string,
  pagination: Pagination,
) => {
  const { page, limit, sort_by, order_by } = pagination;

  const res = await axios.get<
    ResponseDataPagination<AdminEventTransactionResponse[]>
  >(
    NEXT_PUBLIC_BASE_API_URL +
      `/admin/events/transactions?page=${page}&limit=${limit}&sort_by=${sort_by}&order_by=${order_by}`,
    { headers: { Authorization: `Bearer ${token}` } },
  );

  return res.data;
};

export const getAdminEvents = async (token: string, pagination: Pagination) => {
  const { page, limit, sort_by, order_by } = pagination;

  const res = await axios.get<ResponseDataPagination<AdminEventResponse[]>>(
    NEXT_PUBLIC_BASE_API_URL +
      `/admin/events?page=${page}&limit=${limit}&sort_by=${sort_by}&order_by=${order_by}`,
    { headers: { Authorization: `Bearer ${token}` } },
  );

  return res.data;
};

export const updateTransactionStatus = async (
  token: string,
  transactionId: number,
  data: { status: string },
) => {
  const res = await axios.patch<ResponseWithoutData>(
    NEXT_PUBLIC_BASE_API_URL + `/admin/transactions/${transactionId}/status`,
    data,
    { headers: { Authorization: `Bearer ${token}` } },
  );

  return res.data;
};
