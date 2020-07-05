import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create_article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleRepository } from './article.repository';
import { User } from 'src/user/user.entity';
import { Article } from './article.entity';
import { UpdateArticleDto } from './dto/update_article.dto';

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

  getArticleById(idOfArticleNeedEdit: number) {
    return this.articleRepository.findOne({ id: idOfArticleNeedEdit });
  }

  updateArticle(
    idOfArticleNeedEdit: number,
    updateArticleDto: UpdateArticleDto,
  ) {
    return this.articleRepository
      .createQueryBuilder()
      .update()
      .set(updateArticleDto)
      .where({ id: idOfArticleNeedEdit })
      .execute();
  }

  deleteArticle(idOfArticleNeedDelete: number) {
    return this.articleRepository.delete({ id: idOfArticleNeedDelete });
  }
}
