import { IsNotEmpty } from 'class-validator';
import { Department } from 'src/features/company/entity/department.entity';
import { User } from 'src/features/user/entity/user.entity';

export class ShiftDto {
  @IsNotEmpty()
  id: string;
  @IsNotEmpty()
  userId: string;
  @IsNotEmpty()
  departmentId: string;
  @IsNotEmpty()
  startTime: Date;
  @IsNotEmpty()
  endTime: Date;

  user: User;
  department: Department;
}
