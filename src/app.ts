import * as dotenv from 'dotenv';
dotenv.config();
import express, { Express } from 'express';
import { router } from './routes';
import { Server } from 'http';

export class App {
  app: Express;
  port: number;
  server: Server;

  constructor() {
    this.app = express();
    this.port = Number(process.env.PORT) || 8000;
  }

  useRoutes() {
    this.app.use('/', router);
  }

  public async init() {
    this.useRoutes();
    this.server = this.app.listen(this.port);
    console.log(`Server is started on ${this.port} port`);
  }
}
