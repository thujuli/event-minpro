export type ResponseWithData<T = any> = {
  rc: number;
  success: boolean;
  message: string;
  result: T;
};

export type ResponseWithoutData = {
  rc: number;
  success: boolean;
  message: string;
};
