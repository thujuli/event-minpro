import { TransactionController } from '@/controllers/transaction.controller';
import { userGuard, verifyToken } from '@/middlewares/auth.middleware';
import { Router } from 'express';

export class TransactionRouter {
  private router: Router;
  private transactionController: TransactionController;

  constructor() {
    this.router = Router();
    this.transactionController = new TransactionController();
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
