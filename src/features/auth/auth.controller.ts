import {
    Body,
    Controller,
    HttpException,
    HttpStatus,
    Post,
    Delete,
    Req,
    Request,
  } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { Propagation, Transactional } from 'typeorm-transactional-cls-hooked';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
import { User } from '../user/entity/user.entity';

@Controller('auth')
  export class AuthController {
    constructor(
      private readonly authService: AuthService,
      private readonly userService: UserService,
    ) {}

    @Transactional({ propagation: Propagation.REQUIRES_NEW })
    @Post('token')
    async createToken(@Body() loginRequest: SignInDto): Promise<any> {
      try {
        const user = await this.userService.findByEmail(loginRequest.email);
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

    @Transactional({ propagation: Propagation.REQUIRES_NEW })
    @Post('register')
    @Transactional({ propagation: Propagation.REQUIRES_NEW })
    async register(@Body() signUpDto: SignUpDto): Promise<User> {
      return await this.authService.register(signUpDto);
    }

    @Delete('logout')
    removeToken(@Req() request) {
      request.logout();
    }
}
