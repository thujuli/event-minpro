import { TransactionService } from '@/services/transaction.service';
import { TransactionRequest } from '@/types/transaction.type';
import { NextFunction, Request, Response } from 'express';

export class TransactionController {
  public async createTransaction(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const id = res.locals.decoded.id as number;
      const request = req.body as TransactionRequest;

      const response = await TransactionService.createTransaction(id, request);
      return res.status(201).send(response);
    } catch (error) {
      next(error);
    }
  }
}
