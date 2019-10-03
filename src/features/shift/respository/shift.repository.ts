import { EntityRepository } from 'typeorm';
import { CommonRepository } from '../../../core/database/common.repository';
import { Shift } from '../entity/shift.entity';

@EntityRepository(Shift)
export class ShiftRepository extends CommonRepository<Shift> {
  public async findByUserId(
    userId: string,
    select: string[],
    relations: string[] = [],
  ): Promise<Shift> {
    return this.findOne({
      relations,
      select: select as any[],
      where: {
        userId,
      },
    });
  }
}
