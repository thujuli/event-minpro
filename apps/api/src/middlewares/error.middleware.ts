import { ErrorResponse } from '@/utils/error';
import { responseWithoutData } from '@/utils/response';
import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

export const ErrorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof ZodError) {
    return res
      .status(400)
      .send(
        responseWithoutData(
          400,
          false,
          `Validation error: ${JSON.stringify(error)}`,
        ),
      );
  } else if (error instanceof ErrorResponse) {
    return res
      .status(error.status)
      .send(responseWithoutData(error.status, false, error.message));
  } else {
    return res.status(500).send(responseWithoutData(500, false, error.message));
  }
};
