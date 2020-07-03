import {
  IsString,
  IsEmail,
  MinLength,
  IsPhoneNumber,
  IsUrl,
  IsMobilePhone,
  IsOptional,
  IsInt,
  IsIn,
} from 'class-validator';
import { RoleEnum } from '../other/user_role.enum';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsMobilePhone('vi-VN')
  phone: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsUrl()
  avatar: string;

  @IsInt()
  @IsIn(
    Object.keys(RoleEnum)
      .filter(value => Number(value) && Number(value) != RoleEnum.ADMIN)
      .map(value => Number(value)),
  )
  role: number;
}
