import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../common/base.controller';
import { LoggerService } from '../logger/logger.service';
import { HTTPError } from '../error/http-error.class';

export class UserController extends BaseController {
  constructor(logger: LoggerService) {
    super(logger);
    this.bindRoutes([
      { path: '/register', func: this.register, method: 'post' },
      { path: '/login', func: this.login, method: 'post' },
    ]);
  }

  register(req: Request, res: Response, next: NextFunction) {
    this.ok(res, 'Register route');
  }

  login(req: Request, res: Response, next: NextFunction) {
    // this.ok(res, 'Login route');
    next(new HTTPError(401, 'auth error', 'login')); // [login] Error 401: auth error
  }
}
