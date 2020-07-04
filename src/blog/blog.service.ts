import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create_article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleRepository } from './article.repository';
import { User } from 'src/user/user.entity';
import { Article } from './article.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(ArticleRepository)
    private articleRepository: ArticleRepository,
  ) {}

  saveArticle(createArticleDto: CreateArticleDto, user: User): Promise<void> {
    return this.articleRepository.saveArticle(createArticleDto, user);
  }

  getArticles(): Promise<Article[]> {
    return this.articleRepository.getAllArticles();
  }
}
