import 'reflect-metadata';
import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../common/base.controller';
import { HTTPError } from '../error/http-error.class';
import { ILogger } from '../logger/logger.interface';
import { injectable } from 'inversify/lib/annotation/injectable';
import { inject } from 'inversify/lib/annotation/inject';
import { TYPES } from '../types';
import { IUserController } from './user.controller.interface';

@injectable()
export class UserController extends BaseController implements IUserController {
  constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
    super(loggerService);
    this.bindRoutes([
      { path: '/register', func: this.register, method: 'post' },
      { path: '/login', func: this.login, method: 'post' },
    ]);
  }

  register(req: Request, res: Response, next: NextFunction): void {
    this.ok(res, 'Register route');
  }

  login(req: Request, res: Response, next: NextFunction): void {
    // this.ok(res, 'Login route');
    next(new HTTPError(401, 'auth error', 'login')); // [login] Error 401: auth error
  }
}
