import { EntityRepository, Repository } from 'typeorm';
import { Article } from './article.entity';
import { User } from 'src/user/user.entity';
import { InternalServerErrorException, Logger } from '@nestjs/common';
const getSlug = require('speakingurl');

@EntityRepository(Article)
export class ArticleRepository extends Repository<Article> {
  private logger = new Logger();

  async saveArticle(createArticleDto, user: User): Promise<void> {
    const { title, description, content, thumbnail } = createArticleDto;
    const article = new Article();

    article.title = title;
    article.description = description;
    article.content = content;
    article.thumbnail = thumbnail;
    article.author = user;
    article.slug = getSlug(`${article.title}-${Date.now()}`);

    try {
      await this.save(article);
    } catch (error) {
      this.logger.error(error, error.stack, 'ArticleRepository');
      throw new InternalServerErrorException();
    }
  }

  getAllArticles(): Promise<Article[]> {
    const query = this.createQueryBuilder('article');
    return query
      .select(['user.name', 'user.id', 'article.title', 'article.id'])
      .innerJoin('article.author', 'user')
      .orderBy('article.created_at', 'DESC')
      .getMany();
  }

  getThumbnailArticle() {
    const query = this.createQueryBuilder('article');
    return query
      .select([
        'user.name',
        'user.id',
        'article.title',
        'article.id',
        'article.thumbnail',
        'article.description',
        'article.slug',
        'article.created_at',
      ])
      .innerJoin('article.author', 'user')
      .orderBy('article.created_at', 'DESC')
      .getMany();
  }

  findBySlug(slug: string) {
    return this.createQueryBuilder('article')
      .select([
        'user.name',
        'user.id',
        'article.id',
        'article.title',
        'article.slug',
        'article.description',
        'article.content',
        'article.thumbnail',
        'article.created_at',
      ])
      .innerJoin('article.author', 'user')
      .where('article.slug = :slug', { slug })
      .orderBy('article.created_at', 'DESC')
      .getOne();
  }
}
