import { VoucherService } from '@/services/voucher.service';
import { CreateVoucher } from '@/types/voucher.type';
import { NextFunction, Request, Response } from 'express';

export class VoucherController {
  public async createVoucher(req: Request, res: Response, next: NextFunction) {
    try {
      const id = res.locals.decoded.id as number;
      const body = req.body as CreateVoucher;

      const response = await VoucherService.createVoucher(id, body);
      return res.status(201).send(response);
    } catch (error) {
      next(error);
    }
  }
}