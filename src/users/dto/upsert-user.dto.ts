import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

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
  phoneNumber: number;

  @IsOptional()
  @IsString()
  profileImageUrl: string | null;

  @IsOptional()
  @IsString()
  profileImagePublicId: string | null;

  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;
}
