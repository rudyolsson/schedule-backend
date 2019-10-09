import { Body, Controller, Post, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { Transactional, Propagation } from 'typeorm-transactional-cls-hooked';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Transactional({ propagation: Propagation.REQUIRES_NEW })
  @Get()
  async hello() {
    return await this.userService.findById(
      '38e03541-9d1b-454f-bf15-756146c93e9b',
      ['id', 'email'],
      ['companies', 'companies.company', 'profile'],
    );
  }
}
