import { AdminController } from '@/controllers/admin.controller';
import { adminGuard, verifyToken } from '@/middlewares/auth.middleware';
import { Router } from 'express';

export class AdminRouter {
  private router: Router;
  private adminController: AdminController;

  constructor() {
    this.router = Router();
    this.adminController = new AdminController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(
      '/events',
      verifyToken,
      adminGuard,
      this.adminController.getAdminEvents,
    );

    this.router.get(
      '/events/transactions',
      verifyToken,
      adminGuard,
      this.adminController.getEventTransactions,
    );
  }

  public getRoutes(): Router {
    return this.router;
  }
}
