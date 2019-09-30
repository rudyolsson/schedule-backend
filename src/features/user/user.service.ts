import { Injectable } from '@nestjs/common';
import { User } from '../user/entity/user.entity';
import { UserRepository } from '../user/entity/user.repository';
import { Propagation, Transactional } from 'typeorm-transactional-cls-hooked';
import { getCustomRepository } from 'typeorm';

@Injectable()
export class UserService {
  constructor() {}

  @Transactional({ propagation: Propagation.MANDATORY })
  public async findByEmail(
    email: string,
    relations: string[] = [],
  ): Promise<User> {
    return await getCustomRepository(UserRepository).findByEmail(
      email,
      relations,
    );
  }

  @Transactional({ propagation: Propagation.MANDATORY })
  public async create(email: string, password: string, isActive: boolean): Promise<User> {
    return await getCustomRepository(UserRepository).saveEntity(
      email,
      password,
      isActive,
    );
  }

  @Transactional({ propagation: Propagation.MANDATORY })
  public async setActive(user: User): Promise<void> {
    await getCustomRepository(UserRepository).setActive(user);
  }

  public isUserInvalid(user: User): boolean {
    return !user || !user.isActive;
  }
}
