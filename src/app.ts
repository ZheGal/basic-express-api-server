import 'reflect-metadata';
import express, { Express } from 'express';
import { Server } from 'http';
import { UserController } from './user/user.controller';
import { AppController } from './app.controller';
import { ExceptionFilter } from './error/exception.filter';
import { ILogger } from './logger/logger.interface';
import { injectable } from 'inversify/lib/annotation/injectable';
import { inject } from 'inversify/lib/annotation/inject';
import { TYPES } from './types';

@injectable()
export class App {
  app: Express;
  port: number;
  server: Server;

  constructor(
    @inject(TYPES.ILogger) private logger: ILogger,
    @inject(TYPES.AppController) private appController: AppController,
    @inject(TYPES.UserController) private userController: UserController,
    @inject(TYPES.ExceptionFilter) private exceptionFilter: ExceptionFilter
  ) {
    this.app = express();
    this.port = 8000;
    this.logger = logger;
  }

  useRoutes() {
    this.app.use('/', this.appController.router);
    this.app.use('/users', this.userController.router);
  }

  useExceptionFilters() {
    this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }

  public async init(port?: number) {
    this.port = port || 8000;
    this.useRoutes();
    this.useExceptionFilters();
    this.server = this.app.listen(this.port);
    this.logger.log(`Server is started on ${this.port} port`);
  }
}
