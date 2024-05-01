export type ResponseWithData = {
  rc: number;
  success: boolean;
  message: string;
  result: object;
};

export type ResponseWithoutData = {
  rc: number;
  success: boolean;
  message: string;
};
