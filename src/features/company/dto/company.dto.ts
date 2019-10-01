import { IsNotEmpty } from 'class-validator';

export class CompanyDto {
  @IsNotEmpty()
  name: string;
}
