import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create_article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleRepository } from './article.repository';
import { User } from 'src/user/user.entity';
import { Article } from './article.entity';
import { UpdateArticleDto } from './dto/update_article.dto';
const getSlug = require('speakingurl');

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(ArticleRepository)
    private articleRepository: ArticleRepository,
  ) {}

  saveArticle(createArticleDto: CreateArticleDto, user: User): Promise<void> {
    if (!createArticleDto.thumbnail) delete createArticleDto.thumbnail;
    return this.articleRepository.saveArticle(createArticleDto, user);
  }

  getAllArticles(): Promise<Article[]> {
    return this.articleRepository.getAllArticles();
  }

  getThumbnailArticle() {
    return this.articleRepository.getThumbnailArticle();
  }

  getArticleById(idOfArticleNeedEdit: number) {
    return this.articleRepository.findOne({ id: idOfArticleNeedEdit });
  }

  getArticleBySlug(slug: string) {
    return this.articleRepository.findBySlug(slug);
  }

  updateArticle(
    idOfArticleNeedEdit: number,
    updateArticleDto: UpdateArticleDto,
  ) {
    const slug = getSlug(updateArticleDto.title);
    return this.articleRepository
      .createQueryBuilder()
      .update()
      .set({ ...updateArticleDto, slug })
      .where({ id: idOfArticleNeedEdit })
      .execute();
  }

  deleteArticle(idOfArticleNeedDelete: number) {
    return this.articleRepository.delete({ id: idOfArticleNeedDelete });
  }
}
