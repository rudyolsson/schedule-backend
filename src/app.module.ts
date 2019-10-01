import { Module } from '@nestjs/common';
import { ConfigModule } from './core/config/config.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './features/auth/auth.module';
import { RolesGuard } from './features/auth/guards/roles-guard';
import { UserModule } from './features/user/user.module';
import { CompanyModule } from './features/company/company.module';
import { ProfileModule } from './features/profile/profile.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [AuthModule, UserModule, CompanyModule, ProfileModule, CoreModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
