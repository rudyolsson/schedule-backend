import { Injectable } from '@nestjs/common';
import { Shift } from './entity/shift.entity';
import { ShiftRepository } from './respository/shift.repository';
import { ShiftBuilder } from './builder/shift.builder';
import { getCustomRepository } from 'typeorm';
import { User } from '../user/entity/user.entity';
import { ShiftDto } from './dto/shift.dto';
import { Department } from '../company/entity/department.entity';

@Injectable()
export class ShiftService {
  constructor() {}

  public async get(shiftId: string): Promise<Shift> {
    const shiftRepository: ShiftRepository = getCustomRepository(
      ShiftRepository,
    );

    return await shiftRepository.findById(shiftId, [
      'id',
      'userId',
      'departmentId',
      'startTime',
      'endTime',
    ], [
      'user',
      'department',
      ],
      );
  }

  public async create(
    user: User,
    department: Department,
    startTime: Date,
    endTime: Date,
  ): Promise<Shift> {
    const shiftRepository: ShiftRepository = getCustomRepository(
      ShiftRepository,
    );
    const shift: Shift = new ShiftBuilder()
      .setUser(user)
      .setUserId(user.id)
      .setDepartment(department)
      .setDepartmentId(department.id)
      .setStartTime(startTime)
      .setEndTime(endTime)
      .build();

    return await shiftRepository.save(shift);
  }

  public async update(shift: ShiftDto): Promise<void> {
    const shiftRepository: ShiftRepository = getCustomRepository(
      ShiftRepository,
    );
    await shiftRepository.update(shift.id, shift);
  }
}
