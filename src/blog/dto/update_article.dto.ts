import { MinLength, IsString, IsNumber } from 'class-validator';

export class UpdateArticleDto {
  @MinLength(1)
  title: string;

  @MinLength(1)
  description: string;

  @IsString()
  thumbnail: string;

  @MinLength(1)
  content: string;

  @IsNumber()
  category: number;

  @IsNumber({}, { each: true })
  tags: number[];
}
