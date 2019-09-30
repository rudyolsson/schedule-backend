import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './types/auth.types';
import { UserService } from '../user/service/user.service';
import UserModel from '../user/model/user.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async createTokenForUser(user: JwtPayload) {
    return this.jwtService.sign(user);
  }

  async validateUser(payload: JwtPayload): Promise<UserModel> {
    // todo use cache here
    return await this.userService.findByEmailAndNoError(payload.email);
  }
}
