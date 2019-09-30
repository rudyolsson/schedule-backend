import {
    Body,
    Controller,
    HttpException,
    HttpStatus,
    Post,
    Delete,
    Req,
  } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../../user/service/user.service';
import { LoginRequest } from '../../user/dto/login-request';

@Controller('auth')
  export class AuthController {
    constructor(
      private readonly authService: AuthService,
      private readonly userService: UserService,
    ) {}

    @Post('token')
    async createToken(@Body() loginRequest: LoginRequest): Promise<any> {
      try {
        const user = await this.userService.getByLogin(loginRequest);
        const jwtPayload = {
          email: user.email,
          roles: user.roles,
        };
        const accessToken = await this.authService.createTokenForUser(jwtPayload);
        return { jwtPayload, accessToken };
      } catch (e) {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      }
    }

    @Delete('logout')
    removeToken(@Req() request) {
      request.logout();
    }
}
