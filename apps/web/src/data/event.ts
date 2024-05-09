import { NEXT_PUBLIC_BASE_API_URL } from "@/lib/env";
import { EventRequest } from "@/types/event";
import { ResponseWithoutData } from "@/types/global";
import axios from "axios";

export const getEventById = async (id: number) => {
  try {
    let url = NEXT_PUBLIC_BASE_API_URL + `/events/${id}`;
    const response = await axios.get(url);
    return response.data.result[0];
  } catch (err) {
    console.log("Error fetching event data:", err);
  }
};

export const createEvent = async (token: string, data: EventRequest) => {
  const res = await axios.post<ResponseWithoutData>(
    NEXT_PUBLIC_BASE_API_URL + "/events",
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.data;
};
