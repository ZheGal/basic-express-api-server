import express, { Express } from 'express';
import { Server } from 'http';
import { LoggerService } from './logger/logger.service';
import { UserController } from './user/user.controller';
import { AppController } from './app.controller';

export class App {
  app: Express;
  port: number;
  server: Server;
  logger: LoggerService;
  appController: AppController;
  userController: UserController;

  constructor(
    logger: LoggerService,
    appController: AppController,
    userController: UserController
  ) {
    this.app = express();
    this.port = 8000;
    this.logger = logger;
    this.appController = appController;
    this.userController = userController;
  }

  useRoutes() {
    this.app.use('/', this.appController.router);
    this.app.use('/users', this.userController.router);
  }

  public async init(port?: number) {
    this.port = port || 8000;
    this.useRoutes();
    this.server = this.app.listen(this.port);
    this.logger.log(`Server is started on ${this.port} port`);
  }
}
