import { IsNotEmpty } from 'class-validator';

export class DepartmentDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  companyId: string;
}
