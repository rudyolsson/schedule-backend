import { BaseRepository } from 'typeorm-transactional-cls-hooked';

export abstract class CommonRepository<T> extends BaseRepository<T> {
  public async findAll(select: any[], relations: string[] = []): Promise<T[]> {
    return this.find({
      relations,
      select: select as any[],
    });
  }

  public async findById(
    id: string,
    select: string[],
    relations: string[] = [],
  ): Promise<T> {
    return this.findOne({
      relations,
      select: select as any[],
      where: {
        id,
      },
    });
  }

  public async findByName(
    name: string,
    select: string[],
    relations: string[] = [],
  ): Promise<T> {
    return this.findOne({
      relations,
      select: select as any[],
      where: {
        name,
      },
    });
  }
}
