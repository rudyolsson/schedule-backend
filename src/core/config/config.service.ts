import { Injectable } from '@nestjs/common';
import * as Joi from 'joi';
import * as dotenv from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const databaseConf = require('./database');

export interface EnvConfig {
  [key: string]: string;
}

export type LoggerLevel = 'debug' | 'info' | 'error' | 'warn';

@Injectable()
export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor(filePath: string) {
    if (!this.isProduction) {
      const result = dotenv.config({ path: filePath });
      if (result.error) {
        throw result.error;
      }
    }
    this.envConfig = this.validateInput(process.env);
  }

  get isApiAuthEnabled(): boolean {
    return Boolean(this.envConfig.API_AUTH_ENABLED);
  }

  get nodeEnv(): string {
    return this.envConfig.NODE_ENV;
  }

  get logLevel(): LoggerLevel {
    return 'debug';
  }

  get uiURL(): string {
    return this.envConfig.UI_URL;
  }

  get expressPort(): number {
    return Number(this.envConfig.PORT);
  }

  get secret(): string {
    return this.envConfig.SECRET;
  }

  get databaseConfiguration(): TypeOrmModuleOptions {
    return {
      ...databaseConf,
    };
  }

  get isProduction() {
    return process.env.NODE_ENV === 'production';
  }

  /**
   * Ensures all needed variables are set, and returns the validated JavaScript object
   * including the applied default values.
   */
  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid(['development', 'production', 'test', 'provision'])
        .default('development'),
      PORT: Joi.number().default(3000),
      API_AUTH_ENABLED: Joi.boolean().required(),
      DATABASE_HOST: Joi.string().required(),
      DATABASE_NAME: Joi.string().required(),
      DATABASE_USER: Joi.string().required(),
      DATABASE_ACCESS_KEY: Joi.string().required(),
      DATABASE_PORT: Joi.number(),
      UI_URL: Joi.string().required(),
      SECRET: Joi.string().required(),
    }).options({ stripUnknown: true });

    const { error, value: validatedEnvConfig } = Joi.validate(
      envConfig,
      envVarsSchema,
    );
    if (error) {
      // logger is not available yet and pm2 do not catch this error (get abort sig)
      console.error(`Config validation error: ${error.message}`);
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }
}
