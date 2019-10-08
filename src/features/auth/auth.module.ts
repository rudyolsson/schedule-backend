import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt-strategy';
import { AuthController } from './auth.controller';
import { ConfigModule } from '../../core/config/config.module';
import { ConfigService } from '../../core/config/config.service';
import { UserModule } from '../user/user.module';
import { ProfileModule } from '../profile/profile.module';
import { CompanyModule } from '../company/company.module';
import { User } from '../user/entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    UserModule,
    ProfileModule,
    ConfigModule,
    CompanyModule,
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.secret,
        signOptions: {
          expiresIn: 36000,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UserService],
})
export class AuthModule {}
