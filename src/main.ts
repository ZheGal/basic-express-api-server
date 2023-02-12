import * as dotenv from 'dotenv';
import { App } from './app';
import { LoggerService } from './logger/logger.service';
import { UserController } from './user/user.controller';
import { AppController } from './app.controller';
import { ExceptionFilter } from './error/exception.filter';
import { Container } from 'inversify';
import { ILogger } from './logger/logger.interface';
import { TYPES } from './types';
import { IExceptionFilter } from './error/exception.filter.interface';

dotenv.config();

const appContainer = new Container();
appContainer.bind<ILogger>(TYPES.ILogger).to(LoggerService);
appContainer.bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
appContainer.bind<AppController>(TYPES.AppController).to(AppController);
appContainer.bind<UserController>(TYPES.UserController).to(UserController);
appContainer.bind<App>(TYPES.Application).to(App);

const app = appContainer.get<App>(TYPES.Application);

const port = Number(process.env.PORT);
app.init(port);

export { app, appContainer };
