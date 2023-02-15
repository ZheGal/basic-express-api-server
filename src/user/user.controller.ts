import 'reflect-metadata';
import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../common/base.controller';
import { ILogger } from '../logger/logger.interface';
import { injectable } from 'inversify/lib/annotation/injectable';
import { inject } from 'inversify/lib/annotation/inject';
import { TYPES } from '../types';
import { IUserController } from './user.controller.interface';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserLoginDto } from './dto/user-login.dto';

@injectable()
export class UserController extends BaseController implements IUserController {
  constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
    super(loggerService);
    this.bindRoutes([
      { path: '/register', func: this.register, method: 'post' },
      { path: '/login', func: this.login, method: 'post' },
    ]);
  }

  register(req: Request<{}, {}, UserRegisterDto>, res: Response, next: NextFunction): void {
    console.log(req.body);
    this.ok(res, 'Register route');
  }

  login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): void {
    console.log(req.body);
    this.ok(res, 'Login route');
    // next(new HTTPError(401, 'auth error', 'login')); // [login] Error 401: auth error
  }
}
