import { DotenvConfigOutput, DotenvParseOutput, config } from 'dotenv';
import { IConfigService } from './config.service.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';

@injectable()
export class ConfigService implements IConfigService {
  private config: DotenvParseOutput;

  constructor(@inject(TYPES.ILogger) private logger: ILogger) {
    const result: DotenvConfigOutput = config();
    if (result.error) {
      this.logger.error('[ConfigService] Failed to read .env file or it does not exists');
    } else {
      this.logger.log('[ConfigService] .env configuration successfully loaded');
      this.config = result.parsed as DotenvParseOutput;
    }
  }

  get<T extends number | string>(key: string): T {
    return this.config[key] as T;
  }
}
