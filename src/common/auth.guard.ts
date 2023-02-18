import { Request, Response, NextFunction } from 'express';
import { IMiddleware } from './middleware.interface';

export class AuthGuard implements IMiddleware {
  execute({ user }: Request, res: Response, next: NextFunction): void {
    if (user) {
      return next();
    }
    res.status(401).send({ error: 'Authentication Error' });
  }
}
