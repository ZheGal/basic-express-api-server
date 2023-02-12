import * as dotenv from 'dotenv';
import { App } from './app';

dotenv.config();

const bootstrap = async () => {
  const app = new App();
  await app.init();
};

bootstrap();
