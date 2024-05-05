import express, { json, urlencoded, Express, Request, Response } from 'express';
import cors from 'cors';
import { PORT } from './config';
import { ErrorMiddleware } from './middlewares/error.middleware';
import { AuthRouter } from './routers/auth.router';
import { LocationRouter } from './routers/location.router';
import { CategoryRouter } from './routers/category.router';

export default class App {
  private app: Express;

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

    this.app.get('/', (req: Request, res: Response) => {
      res.send(`Hello, Purwadhika Student !`);
    });

    this.app.use('/auth', authRouter.getRoutes());
    this.app.use('/locations', locationRouter.getRoutes());
    this.app.use('/categories', categoryRouter.getRoutes());
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`  ➜  [API] Local:   http://localhost:${PORT}/`);
    });
  }
}
