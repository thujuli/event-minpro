export const responseWithData = (
  status: number,
  isSuccess: boolean,
  message: string,
  data: object | Array<any>,
) => {
  return {
    rc: status,
    success: isSuccess,
    message,
    result: data,
  };
};

export const responseWithoutData = (
  status: number,
  isSuccess: boolean,
  message: string,
) => {
  return {
    rc: status,
    success: isSuccess,
    message,
  };
};
