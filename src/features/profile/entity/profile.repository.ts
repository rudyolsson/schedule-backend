import { EntityRepository } from 'typeorm';
import { CommonRepository } from '../../../core/database/common.repository';
import { Profile } from './profile.entity';

@EntityRepository(Profile)
export class ProfileRepository extends CommonRepository<Profile> {
  public async findByUserId(
    userId: string,
    select: string[],
    relations: string[] = [],
  ): Promise<Profile> {
    return this.findOne({
      relations,
      select: select as any[],
      where: {
        userId,
      },
    });
  }
}
