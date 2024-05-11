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
