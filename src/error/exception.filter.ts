import { NextFunction, Request, Response } from 'express';
import { LoggerService } from '../logger/logger.service';
import { IExceptionFilter } from './exception.filter.interface';
import { HTTPError } from './http-error.class';

export class ExceptionFilter implements IExceptionFilter {
  logger: LoggerService;
  constructor(logger: LoggerService) {
    this.logger = logger;
  }
  catch(
    err: Error | HTTPError,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const errorMessage =
      err instanceof HTTPError
        ? `[${err.context}] Error ${err.statusCode}: ${err.message}`
        : `${err.message}`;
    const statusCode = err instanceof HTTPError ? err.statusCode : 500;

    this.logger.error(errorMessage);
    res.status(statusCode).send({ error: err.message });
  }
}
