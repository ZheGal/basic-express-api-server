import { Request, Response, NextFunction } from 'express';
import { IMiddleware } from './middleware.interface';
import { HTTPError } from '../error/http-error.class';

export class GuardMiddleware implements IMiddleware {
  execute({ user }: Request, _res: Response, next: NextFunction): void {
    if (user) {
      return next();
    }
    return next(new HTTPError(401, 'Authentication Error'));
  }
}
