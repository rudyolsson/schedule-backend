import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtPayload } from './types/auth.types';
import { ConfigService } from '../../config/config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly authService: AuthService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.secret,
    });
  }

  // will transform jwtPayload to real userModel
  async validate(payload: JwtPayload) {
    const user = await this.authService.validateUser(payload);
    if (!user || !user.isActive) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
