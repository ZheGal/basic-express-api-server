import * as dotenv from 'dotenv';
import { App } from './app';
import { LoggerService } from './logger/logger.service';

dotenv.config();

const bootstrap = async () => {
  const app = new App(new LoggerService());
  const port = Number(process.env.PORT);
  await app.init(port);
};

bootstrap();
