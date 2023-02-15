import * as dotenv from 'dotenv';
import { App } from './app';
import { LoggerService } from './logger/logger.service';
import { UserController } from './user/user.controller';
import { ExceptionFilter } from './error/exception.filter';
import { Container } from 'inversify';
import { ILogger } from './logger/logger.interface';
import { TYPES } from './types';
import { IExceptionFilter } from './error/exception.filter.interface';
import { ContainerModule } from 'inversify/lib/container/container_module';
import { interfaces } from 'inversify/lib/interfaces/interfaces';
import { IUserController } from './user/user.controller.interface';
import { IUserService } from './user/user.service.interface';
import { UserService } from './user/user.service';

dotenv.config();

export interface IBootstrapReturn {
  appContainer: Container;
  app: App;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<ILogger>(TYPES.ILogger).to(LoggerService);
  bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
  bind<IUserController>(TYPES.UserController).to(UserController);
  bind<IUserService>(TYPES.UserService).to(UserService);
  bind<App>(TYPES.Application).to(App);
});

const bootstrap = (): IBootstrapReturn => {
  const appContainer = new Container();
  appContainer.load(appBindings);

  const app = appContainer.get<App>(TYPES.Application);
  const port = Number(process.env.PORT);
  app.init(port);

  return { app, appContainer };
};

export const { app, appContainer } = bootstrap();
