import 'reflect-metadata';
import { Request, Response } from 'express';
import { BaseController } from './common/base.controller';
import { injectable } from 'inversify/lib/annotation/injectable';
import { inject } from 'inversify/lib/annotation/inject';
import { ILogger } from './logger/logger.interface';
import { TYPES } from './types';

@injectable()
export class AppController extends BaseController {
  constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
    super(loggerService);
    this.bindRoutes([
      { path: '/hello', func: this.hello, method: 'get' },
      { path: '/hello/:id', func: this.helloById, method: 'get' },
    ]);
  }

  hello(_: Request, res: Response) {
    res.send('Hello World!');
  }

  helloById(req: Request, res: Response) {
    const { id } = req.params;
    res.send(`Your id is "${id}"`);
  }
}
