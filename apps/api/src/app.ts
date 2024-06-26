import express, { json, urlencoded, Express, Request, Response } from 'express';
import cors from 'cors';
import { PORT } from './config';
import { ErrorMiddleware } from './middlewares/error.middleware';
import { AuthRouter } from './routers/auth.router';
import { LocationRouter } from './routers/location.router';
import { CategoryRouter } from './routers/category.router';
import { EventRouter } from './routers/event.router';
import { UserRouter } from './routers/user.router';
import { join } from 'path';
import { VoucherRouter } from './routers/voucher.router';
import { ReviewRouter } from './routers/review.router';
import { TransactionRouter } from './routers/transaction.router';
import { AdminRouter } from './routers/admin.router';

export default class App {
  readonly app: Express;

  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.handleError();
  }

  private configure(): void {
    this.app.use(cors());
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
  }

  private handleError(): void {
    this.app.use(ErrorMiddleware);
  }

  private routes(): void {
    const authRouter = new AuthRouter();
    const locationRouter = new LocationRouter();
    const categoryRouter = new CategoryRouter();
    const eventRouter = new EventRouter();
    const userRouter = new UserRouter();
    const voucherRouter = new VoucherRouter();
    const reviewRouter = new ReviewRouter();
    const transactionRouter = new TransactionRouter();
    const adminRouter = new AdminRouter();

    this.app.get('/', (req: Request, res: Response) => {
      res.send(`Hello, Purwadhika Student !`);
    });

    this.app.use('/', express.static(join(__dirname, '../public')));
    this.app.use('/auth', authRouter.getRoutes());
    this.app.use('/locations', locationRouter.getRoutes());
    this.app.use('/categories', categoryRouter.getRoutes());
    this.app.use('/events', eventRouter.getRoutes());
    this.app.use('/user', userRouter.getRoutes());
    this.app.use('/vouchers', voucherRouter.getRoutes());
    this.app.use('/reviews', reviewRouter.getRoutes());
    this.app.use('/transactions', transactionRouter.getRoutes());
    this.app.use('/admin', adminRouter.getRoutes());
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`  ➜  [API] Local:   http://localhost:${PORT}/`);
    });
  }
}
