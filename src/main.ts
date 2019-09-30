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

async function bootstrap() {
  initializeTransactionalContext();
  patchTypeORMRepositoryWithBaseRepository();

    // TODO: Add origin in configuration
  const appOptions: NestApplicationOptions = {
      cors: {
        credentials: true,
        origin: [
          'https://localhost:4200',
        ],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders:
          'Content-type,Accept,Authorization',
        preflightContinue: false,
        optionsSuccessStatus: 204,
      },
      bodyParser: true,
    };

  const app = await NestFactory.create(AppModule, appOptions);
  const configService = app.get(ConfigService);

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
bootstrap();
