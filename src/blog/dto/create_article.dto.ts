import { MinLength, IsString } from 'class-validator';

export class CreateArticleDto {
  @MinLength(10)
  title: string;

  @MinLength(10)
  description: string;

  @IsString()
  thumbnail: string;

  @MinLength(50)
  content: string;
}
