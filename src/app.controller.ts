import { Request, Response } from 'express';
import { BaseController } from './common/base.controller';
import { LoggerService } from './logger/logger.service';

export class AppController extends BaseController {
  constructor(logger: LoggerService) {
    super(logger);
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
