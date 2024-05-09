import { UserService } from '@/services/user.service';
import { UserEventQuery } from '@/types/user.type';
import { NextFunction, Request, Response } from 'express';

export class UserController {
  public async getUserEvents(req: Request, res: Response, next: NextFunction) {
    try {
      const id = res.locals.decoded.id as number;
      const query = req.query as UserEventQuery;

      const response = await UserService.getUserEvents(id, query);
      return res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
  public async getUserProfile (req: Request, res: Response, next: NextFunction){
    try {
      const id = res.locals.decoded.id as number;
      const response = await UserService.getDataProfile(id);
      return res.status(200).send(response);
    } catch (error) {
      next(error)
    }
  }
}
