import { UserController } from '@/controllers/user.controller';
import { adminGuard, verifyToken } from '@/middlewares/auth.middleware';
import { Router } from 'express';

export class UserRouter {
  private router: Router;
  private userController: UserController;

  constructor() {
    this.router = Router();
    this.userController = new UserController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(
      '/events',
      verifyToken,
      adminGuard,
      this.userController.getUserEvents,
    );

    this.router.get(
      '/profile',
      verifyToken,
      this.userController.getUserProfile,
    );

    this.router.get(
      '/event/transactions',
      verifyToken,
      adminGuard,
      this.userController.getEventTransactions,
    );
  }

  public getRoutes(): Router {
    return this.router;
  }
}
