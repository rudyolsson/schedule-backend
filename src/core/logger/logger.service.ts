import { Injectable, Logger } from '@nestjs/common';
import {
  createLogger,
  format,
  Logger as WinstonLogger,
  transports,
} from 'winston';
import * as morgan from 'morgan';
import moment = require('moment');
import { ConfigService } from '../config/config.service';

@Injectable()
export class AppLogger extends Logger {
  private winstonLogger: WinstonLogger;

  constructor(private readonly configService: ConfigService) {
    super();

    const errorStackFormat = format((info, opt) => {
      if (info.stack) {
        info.message = `${info.message} ${info.stack}`;
      }
      return info;
    });

    this.winstonLogger = createLogger({
      level: configService.logLevel,
      format: format.combine(
        errorStackFormat(),
        format.colorize(),
        format.simple(),
      ),
      transports: [new transports.Console({ handleExceptions: true })],
      exitOnError: false,
    });
  }

  get stream() {
    return {
      write: (message: string) => Logger.log(message),
    };
  }

  get morganOption(): morgan.Options {
    return {
      stream: {
        write: (message: string) => this.log(message.trim()),
      },
      skip: (req, res) => {
        return req.originalUrl.includes('ping');
      },
    };
  }

  error(message: string, trace: string, context?: string) {
    this.winstonLogger.error(this.addContext(context, message), trace);
  }

  log(message: any, context?: string) {
    this.winstonLogger.info(this.addContext(context, message));
  }

  warn(message: any, context?: string) {
    this.winstonLogger.warn(this.addContext(context, message));
  }

  private addContext = (scope: string | undefined, message: string): string => {
    const now = moment().format('MMM Do YYYY, h:mm:ss a');
    return scope
      ? `${now} [\x1b[33m${scope}\x1b[0m] ${message}`
      : `${now} ${message}`;
  };
}
