import {
  IsString,
  IsEmail,
  MinLength,
  IsUrl,
  IsMobilePhone,
  IsOptional,
  IsIn,
} from 'class-validator';
import { RoleEnum } from '../other/user_role.enum';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsMobilePhone('vi-VN')
  phone: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsUrl()
  avatar: string;

  @IsOptional()
  @IsIn(
    Object.keys(RoleEnum)
      .filter(value => Number(value))
      .map(value => Number(value)),
  )
  role: number;
}
