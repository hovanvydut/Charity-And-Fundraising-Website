import { MinLength } from 'class-validator';

export class CreateArticleDto {
  @MinLength(10)
  title: string;

  @MinLength(50)
  content: string;
}
