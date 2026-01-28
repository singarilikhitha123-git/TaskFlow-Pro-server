import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class upsertUserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsNumber()
  PhoneNumber: number;

  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;
}
