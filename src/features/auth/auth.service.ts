import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './types/auth.types';
import { UserService } from '../user/user.service';
import { User } from '../user/entity/user.entity';
import { TokenNotFoundException } from 'src/core/exceptions/token-not-found.exception';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async createTokenForUser(payload: JwtPayload) {
    return this.jwtService.sign(payload, { expiresIn: '1d'});
  }

  async validateUser(payload: JwtPayload): Promise<User> {
    return await this.userService.findByEmail(payload.email);
  }

  public async checkToken(token: string): Promise<any> {
    try {
      return this.jwtService.verify(token);
    } catch (e) {
      throw new TokenNotFoundException();
    }
  }

  public async isAdmin(token: string): Promise<boolean> {
    try {
      return this.jwtService.verify(token).isAdmin;
    } catch {
      throw new TokenNotFoundException();
    }
  }
}
