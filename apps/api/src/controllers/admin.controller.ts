import { AdminService } from '@/services/admin.service';
import {
  AdminEventQuery,
  AdminEventTransactionQuery,
} from '@/types/admin.type';
import { NextFunction, Request, Response } from 'express';

export class AdminController {
  public async getAdminEvents(req: Request, res: Response, next: NextFunction) {
    try {
      const id = res.locals.decoded.id as number;
      const query = req.query as AdminEventQuery;

      const response = await AdminService.getAdminEvents(id, query);
      return res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }

  public async getEventTransactions(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const id = res.locals.decoded.id as number;
      const query = req.query as AdminEventTransactionQuery;

      const response = await AdminService.getAdminEventTransactions(id, query);
      return res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
}
