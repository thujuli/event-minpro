import { NEXT_PUBLIC_BASE_API_URL } from "@/lib/env";
import {
  AdminEventResponse,
  AdminEventTransactionResponse,
  AdminTotalSalesResponse,
  AdminTransactionStatusResponse,
  FilterDate,
} from "@/types/admin";
import {
  Pagination,
  ResponseDataPagination,
  ResponseWithData,
} from "@/types/global";
import axios from "axios";

export const getAdminEvents = async (token: string, pagination: Pagination) => {
  const { page, limit, sort_by, order_by } = pagination;

  const res = await axios.get<ResponseDataPagination<AdminEventResponse[]>>(
    NEXT_PUBLIC_BASE_API_URL +
      `/admin/events?page=${page}&limit=${limit}&sort_by=${sort_by}&order_by=${order_by}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.data;
};

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
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.data;
};

export const getAdminTotalSales = async (token: string, filter: FilterDate) => {
  const { startDate, endDate } = filter;

  const res = await axios.get<ResponseWithData<AdminTotalSalesResponse[]>>(
    NEXT_PUBLIC_BASE_API_URL +
      `/admin/total-sales?start_date=${startDate}&end_date=${endDate}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.data;
};

export const getTransactionStatus = async (
  token: string,
  filter: FilterDate,
) => {
  const { startDate, endDate } = filter;

  const res = await axios.get<
    ResponseWithData<AdminTransactionStatusResponse[]>
  >(
    NEXT_PUBLIC_BASE_API_URL +
      `/admin/transaction-status?start_date=${startDate}&end_date=${endDate}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.data;
};
