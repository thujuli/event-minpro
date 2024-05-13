<<<<<<< HEAD
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
=======
import { TransactionController } from '@/controllers/transaction.controller';
import { userGuard, verifyToken } from '@/middlewares/auth.middleware';
import { Router } from 'express';

export class TransactionRouter {
  private router: Router;
  private transactionController: TransactionController;

  constructor() {
    this.router = Router();
    this.transactionController = new TransactionController();
>>>>>>> main
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
<<<<<<< HEAD
    this.router.get(
      '/waiting',
      verifyToken,
      this.trasactionController.getEventTransactionWaiting,
    );
    this.router.get(
      '/success',
      verifyToken,
      this.trasactionController.getEventTransactionSuccess,
    );
    this.router.get(
      '/finish',
      verifyToken,
      this.trasactionController.getEventTransactionSuccessByDate,
=======
    this.router.post(
      '/',
      verifyToken,
      userGuard,
      this.transactionController.createTransaction,
>>>>>>> main
    );
  }

  public getRoutes(): Router {
    return this.router;
  }
}
