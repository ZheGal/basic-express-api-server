import express, { Express } from 'express';
import { router } from './routes';
import { Server } from 'http';
import { LoggerService } from './logger/logger.service';

export class App {
  app: Express;
  port: number;
  server: Server;
  logger: LoggerService;

  constructor(logger: LoggerService) {
    this.app = express();
    this.port = 8000;
    this.logger = logger;
  }

  useRoutes() {
    this.app.use('/', router);
  }

  public async init(port?: number) {
    this.port = port || 8000;
    this.useRoutes();
    this.server = this.app.listen(this.port);
    this.logger.log(`Server is started on ${this.port} port`);
  }
}
