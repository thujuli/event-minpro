
import { ReviewController } from '@/controllers/review.controller';
import { TransactionController } from '@/controllers/transaction.controller';
import { adminGuard, userGuard, verifyToken } from '@/middlewares/auth.middleware';
import { Router } from 'express';

export class TrasactionRouter {
  private router: Router;
  private trasactionController: TransactionController;

  constructor() {
    this.router = Router();
    this.trasactionController = new TransactionController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(
      '/waiting',
      verifyToken,
      this.transactionController.getEventTransactionWaiting,
    );

    this.router.get(
      '/success',
      verifyToken,
      this.transactionController.getEventTransactionSuccess,
    );

    this.router.get(
      '/finish',
      verifyToken,
      this.transactionController.getEventTransactionSuccessByDate,
    );

    this.router.post(
      '/',
      verifyToken,
      userGuard,
      this.transactionController.createTransaction,
    );
  }

  public getRoutes(): Router {
    return this.router;
  }
}
