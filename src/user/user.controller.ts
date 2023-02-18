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
import { IUserService } from './user.service.interface';
import { HTTPError } from '../error/http-error.class';
import { ValidateMiddleware } from '../common/validate.middleware';
import { sign } from 'jsonwebtoken';
import { IConfigService } from '../config/config.service.interface';
import { AuthGuard } from '../common/auth.guard';

@injectable()
export class UserController extends BaseController implements IUserController {
  constructor(
    @inject(TYPES.ILogger) private loggerService: ILogger,
    @inject(TYPES.UserService) private userService: IUserService,
    @inject(TYPES.ConfigService) private configService: IConfigService,
  ) {
    super(loggerService);
    this.bindRoutes([
      {
        path: '/register',
        func: this.register,
        method: 'post',
        middlewares: [new ValidateMiddleware(UserRegisterDto)],
      },
      {
        path: '/login',
        func: this.login,
        method: 'post',
        middlewares: [new ValidateMiddleware(UserLoginDto)],
      },
      {
        path: '/info',
        func: this.info,
        method: 'get',
        middlewares: [new AuthGuard()],
      },
    ]);
  }

  async register(
    { body }: Request<{}, {}, UserRegisterDto>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const user = await this.userService.createUser(body);
    if (!user) {
      return next(new HTTPError(422, 'The user already exists'));
    }
    this.ok(res, { id: user.id, email: user.email, name: user.name });
  }

  async login(
    { body }: Request<{}, {}, UserLoginDto>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const user = await this.userService.validateUser(body);
    if (!user) {
      return next(new HTTPError(401, 'Authorization failed'));
    }
    const accessToken = await this.signJWT(body.email, this.configService.get('SECRET'));
    this.ok(res, { accessToken });
  }

  async info({ user }: Request, res: Response, next: NextFunction): Promise<void> {
    const userInfo = await this.userService.getUserByEmail(user);
    if (!userInfo) {
      return next(new HTTPError(404, 'User not found'));
    }
    const { id, email } = userInfo;
    this.ok(res, { id, email });
  }

  private signJWT(email: string, secret: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      sign(
        {
          email,
          iat: Math.floor(Date.now() / 1000),
        },
        secret,
        {
          algorithm: 'HS256',
        },
        (err, token) => {
          if (err) {
            reject(err);
          }
          resolve(token as string);
        },
      );
    });
  }
}
