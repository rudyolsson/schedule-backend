import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './core/config/config.service';
import * as helmet from 'helmet';
import * as jwt from 'express-jwt';
import {
  initializeTransactionalContext,
  patchTypeORMRepositoryWithBaseRepository,
} from 'typeorm-transactional-cls-hooked';
import { NestApplicationOptions } from '@nestjs/common';
import { JwtExpirationFilter } from './features/auth/jwt-expiration-filter';
import { AppLogger } from './core/logger/logger.service';
import * as morgan from 'morgan';

async function bootstrap() {
  initializeTransactionalContext();
  patchTypeORMRepositoryWithBaseRepository();

  // TODO: Add origin in configuration
  const appOptions: NestApplicationOptions = {
    cors: {
      credentials: true,
      origin: ['http://localhost:3000'],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      allowedHeaders: 'Content-type,Accept,Authorization',
      preflightContinue: false,
      optionsSuccessStatus: 204,
    },
    bodyParser: true,
  };

  const app = await NestFactory.create(AppModule, appOptions);
  const configService = app.get(ConfigService);
  const appLogger = app.get(AppLogger);

  const morganFormat = configService.isProduction ? 'combined' : 'dev';
  app.use(morgan(morganFormat, appLogger.morganOption));
  app.useLogger(appLogger);
  app.use(helmet());

  app.use(
    jwt({
      secret: configService.secret,
      credentialsRequired: false,
    }),
  );

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new JwtExpirationFilter(httpAdapter));

  await app.listen(configService.expressPort);
}
(async () => {
  try {
    await bootstrap();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
