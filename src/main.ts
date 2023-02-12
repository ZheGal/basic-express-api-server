import * as dotenv from 'dotenv';
import { App } from './app';
import { LoggerService } from './logger/logger.service';
import { UserController } from './user/user.controller';
import { AppController } from './app.controller';
import { ExceptionFilter } from './error/exception.filter';

dotenv.config();

const bootstrap = async () => {
  const logger = new LoggerService();
  const app = new App(
    logger,
    new AppController(logger),
    new UserController(logger),
    new ExceptionFilter(logger)
  );
  const port = Number(process.env.PORT);
  await app.init(port);
};

bootstrap();
