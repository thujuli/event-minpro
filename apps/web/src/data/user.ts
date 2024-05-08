import { NEXT_PUBLIC_BASE_API_URL } from "@/lib/env";
import { UserEventResponse } from "@/types/user";
import { Pagination, ResponseDataPagination } from "@/types/global";
import axios from "axios";

export const getUserEvents = async (token: string, pagination: Pagination) => {
  const { page, limit, sort_by, order_by } = pagination;

  const res = await axios.get<ResponseDataPagination<UserEventResponse[]>>(
    NEXT_PUBLIC_BASE_API_URL +
      `/user/events?page=${page}&limit=${limit}&sort_by=${sort_by}&order_by=${order_by}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.data;
};
