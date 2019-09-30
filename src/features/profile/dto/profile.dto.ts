import { IsNotEmpty, IsNumber, Matches } from 'class-validator';

export class ProfileDto {
  @IsNotEmpty()
  userId: string;
  @IsNotEmpty()
  firstName: string;
  @IsNotEmpty()
  lastName: string;
  @IsNotEmpty()
  @Matches(new RegExp('([+]?d{1,2}[.-s]?)?(d{3}[.-]?){2}d{4}', 'g'))
  phone: string;
  @IsNotEmpty()
  country: string;
  @IsNotEmpty()
  address: string;
  additionalAddress: string;
  @IsNotEmpty()
  @IsNumber()
  zip: number;
  @IsNotEmpty()
  city: string;
}
