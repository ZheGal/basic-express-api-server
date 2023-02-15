import 'reflect-metadata';
import { NextFunction, Request, Response } from 'express';
import { IExceptionFilter } from './exception.filter.interface';
import { HTTPError } from './http-error.class';
import { injectable } from 'inversify/lib/annotation/injectable';
import { ILogger } from '../logger/logger.interface';
import { inject } from 'inversify/lib/annotation/inject';
import { TYPES } from '../types';

@injectable()
export class ExceptionFilter implements IExceptionFilter {
  constructor(@inject(TYPES.ILogger) private logger: ILogger) {}

  catch(err: Error | HTTPError, req: Request, res: Response, next: NextFunction): void {
    const errorMessage =
      err instanceof HTTPError
        ? `[${err.context}] Error ${err.statusCode}: ${err.message}`
        : `${err.message}`;
    const statusCode = err instanceof HTTPError ? err.statusCode : 500;

    this.logger.error(errorMessage);
    res.status(statusCode).send({ error: err.message });
  }
}
