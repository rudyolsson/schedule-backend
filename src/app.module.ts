import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './core/config/config.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './features/auth/auth.module';
import { RolesGuard } from './features/auth/guards/roles-guard';
import { UserModule } from './features/user/user.module';

@Module({
  imports: [AuthModule, ConfigModule, UserModule],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
