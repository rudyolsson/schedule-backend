import {
  Column,
  Entity,
  JoinColumn,
  Unique,
  PrimaryColumn,
  ManyToOne,
} from 'typeorm';
import { TraceableEntity } from '../../../core/database/traceable.entity';
import { User } from '../../user/entity/user.entity';
import { ShiftBuilder } from '../builder/shift.builder';
import { Department } from 'src/features/company/entity/department.entity';

@Entity({ name: 't_shift' })
export class Shift extends TraceableEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ nullable: false })
  userId: string;

  @Column({ nullable: true })
  departmentId: string;

  @Column({ nullable: false })
  startTime: Date;

  @Column({ nullable: false })
  endTime: Date;

  @ManyToOne(type => User, user => user.shifts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(type => Department, department => department.shifts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'departmentId' })
  department: Department;

  constructor(shiftBuilder: ShiftBuilder) {
    super();
    if (shiftBuilder) {
      this.id = shiftBuilder.id;
      this.userId = shiftBuilder.userId;
      this.user = shiftBuilder.user;
      this.department = shiftBuilder.department;
      this.departmentId = shiftBuilder.departmentId;
      this.startTime = shiftBuilder.startTime;
      this.endTime = shiftBuilder.endTime;
    }
  }
}
