import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { AppLogger } from './logger/logger.service';

@Global()
@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return {
          ...configService.databaseConfiguration,
        };
      },
    }),
  ],
  providers: [AppLogger],
  exports: [TypeOrmModule, AppLogger],
})
export class CoreModule {}
