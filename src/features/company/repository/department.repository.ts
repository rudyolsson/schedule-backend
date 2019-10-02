import {
    EntityRepository,
    UpdateResult,
    } from 'typeorm';
import { CommonRepository } from '../../../core/database/common.repository';
import { DepartmentDto } from '../dto/department.dto';
import { Department } from '../entity/department.entity';
import { DepartmentBuilder } from '../builder/department.builder';

@EntityRepository(Department)
  export class DepartmentRepository extends CommonRepository<DepartmentDto> {
    public async updateEntity(
      {
        id,
        name,
      }: Department,
    ): Promise<UpdateResult> {
      const department: Department = await new DepartmentBuilder()
        .setName(name)
        .build();

      return await this.update(id, department);
    }
  }
