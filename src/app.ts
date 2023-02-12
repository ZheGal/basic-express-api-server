import express, { Express } from 'express';
import { Server } from 'http';
import { UserController } from './user/user.controller';
import { AppController } from './app.controller';
import { ExceptionFilter } from './error/exception.filter';
import { ILogger } from './logger/logger.interface';

export class App {
  app: Express;
  port: number;
  server: Server;
  logger: ILogger;
  appController: AppController;
  userController: UserController;
  exceptionFilter: ExceptionFilter;

  constructor(
    logger: ILogger,
    appController: AppController,
    userController: UserController,
    exceptionFilter: ExceptionFilter
  ) {
    this.app = express();
    this.port = 8000;
    this.logger = logger;
    this.appController = appController;
    this.userController = userController;
    this.exceptionFilter = exceptionFilter;
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
