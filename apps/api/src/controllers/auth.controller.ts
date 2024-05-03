import { AuthService } from '@/services/auth.service';
import { LoginRequest, RegisterRequest } from '@/types/user.type';
import { NextFunction, Request, Response } from 'express';

export class AuthController {
  public async register(req: Request, res: Response, next: NextFunction) {
    try {
      const request = req.body as RegisterRequest;
      const response = await AuthService.register(request);

      return res.status(201).send(response);
    } catch (error) {
      next(error);
    }
  }

  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const request = req.body as LoginRequest;
      const response = await AuthService.login(request);

      return res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
}
