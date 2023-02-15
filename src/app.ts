import 'reflect-metadata';
import express, { Express } from 'express';
import { Server } from 'http';
import { ILogger } from './logger/logger.interface';
import { injectable } from 'inversify/lib/annotation/injectable';
import { inject } from 'inversify/lib/annotation/inject';
import { TYPES } from './types';
import { json } from 'body-parser';
import { IConfigService } from './config/config.service.interface';
import { IExceptionFilter } from './error/exception.filter.interface';
import { UserController } from './user/user.controller';

@injectable()
export class App {
  app: Express;
  port: number;
  server: Server;

  constructor(
    @inject(TYPES.ILogger) private logger: ILogger,
    @inject(TYPES.UserController) private userController: UserController,
    @inject(TYPES.ExceptionFilter) private exceptionFilter: IExceptionFilter,
    @inject(TYPES.ConfigService) private configService: IConfigService,
  ) {
    this.app = express();
    this.port = 8000;
    this.logger = logger;
  }

  useMiddleware(): void {
    this.app.use(json());
  }

  useRoutes(): void {
    this.app.use('/users', this.userController.router);
  }

  useExceptionFilters(): void {
    this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }

  public async init(): Promise<void> {
    this.port = this.configService.get<number>('PORT') | 8000;
    this.useMiddleware();
    this.useRoutes();
    this.useExceptionFilters();
    this.server = this.app.listen(this.port);
    this.logger.log(`Server is started on ${this.port} port`);
  }
}
