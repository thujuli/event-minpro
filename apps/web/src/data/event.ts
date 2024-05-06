import { NEXT_PUBLIC_BASE_API_URL } from "@/lib/env";
import { EventResponse } from "@/types/event";
import { ResponseDataPagination } from "@/types/global";
import axios from "axios";

export const getEvents = async (page: number) => {
  const res = await axios.get<ResponseDataPagination<EventResponse[]>>(
    NEXT_PUBLIC_BASE_API_URL + "/events?page=" + page,
  );

  return res.data;
};
