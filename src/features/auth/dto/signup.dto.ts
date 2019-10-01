import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  firstName: string;
  @IsNotEmpty()
  lastName: string;
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  confirmPassword: string;
  @IsNotEmpty()
  phoneNumber: string;
  @IsNotEmpty()
  country: string;
  @IsNotEmpty()
  company: string;
}
