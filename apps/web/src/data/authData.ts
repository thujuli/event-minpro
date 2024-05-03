import axios from "axios";
import { NEXT_PUBLIC_BASE_API_URL } from "@/lib/env";
import { LoginRequest, LoginResponse, RegisterRequest } from "@/types/authType";
import { ResponseWithData, ResponseWithoutData } from "@/types/globalType";

export const registerUser = async (data: RegisterRequest) => {
  const res = await axios.post<ResponseWithoutData>(
    NEXT_PUBLIC_BASE_API_URL + "/auth/register",
    data,
  );

  return res.data;
};

export const loginUser = async (data: LoginRequest) => {
  const res = await axios.post<ResponseWithData<LoginResponse>>(
    NEXT_PUBLIC_BASE_API_URL + "/auth/login",
    data,
  );

  return res.data;
};
