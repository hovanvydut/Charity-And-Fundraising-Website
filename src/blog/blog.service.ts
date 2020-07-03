import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create_article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleRepository } from './article.repository';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(ArticleRepository)
    private articleRepository: ArticleRepository,
  ) {}

  saveArticle(createArticleDto: CreateArticleDto) {
    this.articleRepository.save(createArticleDto);
  }
}
