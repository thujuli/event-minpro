import { VoucherController } from '@/controllers/voucher.controller';
import { adminGuard, verifyToken } from '@/middlewares/auth.middleware';
import { Router } from 'express';

export class VoucherRouter {
  private router: Router;
  private voucherController: VoucherController;

  constructor() {
    this.router = Router();
    this.voucherController = new VoucherController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      '/',
      verifyToken,
      adminGuard,
      this.voucherController.createVoucher,
    );

    this.router.get(
      '/:eventId',
      verifyToken,
      adminGuard,
      this.voucherController.getVoucherById,
    );
  }

  public getRoutes(): Router {
    return this.router;
  }
}
