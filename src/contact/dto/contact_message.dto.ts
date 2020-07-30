import { IsString, MinLength } from 'class-validator';

export class ContactMessageDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsString()
  @MinLength(4)
  info: string;

  @IsString()
  @MinLength(5)
  subject: string;

  @IsString()
  @MinLength(1)
  message: string;
}
