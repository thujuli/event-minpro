import { TrasactionService } from '@/services/transaction.service';
import { TransactionCheckout } from '@/types/transaction.type';
import { NextFunction, Request, Response } from 'express';

export class TransactionController {
  public async getEventTransactionWaiting(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const id = res.locals.decoded.id as number;
      const body = req.body as TransactionCheckout;

      const response = await TrasactionService.getPaymentStatusWaiting(
        id,
        body,
      );

      return res.status(201).send(response);
    } catch (error) {
      next(error);
    }
  }
  
  public async getEventTransactionSuccess(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const id = res.locals.decoded.id as number;
      const body = req.body as TransactionCheckout;

      const response = await TrasactionService.getPaymentStatusSuccess(
        id,
        body,
      );

      return res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
  public async getEventTransactionSuccessByDate(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const id = res.locals.decoded.id as number;
      const body = req.body as TransactionCheckout;

      const response = await TrasactionService.getPaymentStatusSuccessByDate(
        id,
        body,
      );

      return res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
}
