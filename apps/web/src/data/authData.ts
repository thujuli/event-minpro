import axios from "axios";
import { NEXT_PUBLIC_BASE_API_URL } from "@/lib/env";
import { RegisterRequest } from "@/types/authType";
import { ResponseWithoutData } from "@/types/globalType";

export const registerUser = async (data: RegisterRequest) => {
  const res = await axios.post<ResponseWithoutData>(
    NEXT_PUBLIC_BASE_API_URL + "/auth/register",
    data,
  );

  return res.data;
};
