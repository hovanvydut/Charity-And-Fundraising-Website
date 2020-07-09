import { IsString, MinLength, IsNumber } from 'class-validator';

export class UpdateContactMessageDto {
  @IsNumber()
  id: number;

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
  @MinLength(20)
  message: string;

  @IsString()
  note: string;
}
