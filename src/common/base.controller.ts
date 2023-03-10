import 'reflect-metadata';
import { Response, Router } from 'express';
import { ExpressReturnType, Route } from './route.interface';
import { ILogger } from '../logger/logger.interface';
import { injectable } from 'inversify/lib/annotation/injectable';

@injectable()
export abstract class BaseController {
  private readonly _router: Router;

  constructor(private logger: ILogger) {
    this._router = Router();
  }

  get router(): Router {
    return this._router;
  }

  public send<T>(res: Response, code: number, message: T): ExpressReturnType {
    res.type('application/json');
    return res.status(code).json(message);
  }

  public ok<T>(res: Response, message: T): ExpressReturnType {
    return this.send<T>(res, 200, message);
  }

  public created(res: Response): ExpressReturnType {
    return res.sendStatus(201);
  }

  protected bindRoutes(routes: Route[]): void {
    routes.map((route) => {
      const handler = route.func.bind(this);
      const middleware = route.middlewares?.map((middleware) =>
        middleware.execute.bind(middleware),
      );
      const pipeline = middleware ? [...middleware, handler] : handler;
      this.logger.log(`[${route.method}] ${route.path}`);
      this.router[route.method](route.path, pipeline);
    });
  }
}
