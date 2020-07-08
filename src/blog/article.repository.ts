import { EntityRepository, Repository } from 'typeorm';
import { Article } from './article.entity';
import { User } from 'src/user/user.entity';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { Tag } from './tag.entity';
import { UpdateArticleDto } from './dto/update_article.dto';
const getSlug = require('speakingurl');

@EntityRepository(Article)
export class ArticleRepository extends Repository<Article> {
  private logger = new Logger();

  async saveArticle(createArticleDto, user: User): Promise<void> {
    const {
      title,
      description,
      content,
      thumbnail,
      category,
      tags,
    } = createArticleDto;
    const article = new Article();

    article.title = title;
    article.description = description;
    article.content = content;
    article.thumbnail = thumbnail;
    article.author = user;
    article.slug = getSlug(`${article.title}-${Date.now()}`);
    article.category = category;

    try {
      await this.save(article);
      await this.createQueryBuilder()
        .relation(Article, 'tags')
        .of(article)
        .add(tags);
    } catch (error) {
      this.logger.error(error, error.stack, 'ArticleRepository');
      throw new InternalServerErrorException();
    }
  }

  async updateArticle(
    idOfArticleNeedEdit: number,
    updateArticleDto: UpdateArticleDto,
  ) {
    const {
      title,
      description,
      content,
      thumbnail,
      category,
      tags,
    } = updateArticleDto;
    const article = new Article();
    console.log(category);
    article.title = title;
    article.description = description;
    article.content = content;
    article.thumbnail = thumbnail;
    article.slug = getSlug(`${article.title}-${Date.now()}`);

    await this.createQueryBuilder()
      .update()
      .set(article)
      .where({ id: idOfArticleNeedEdit })
      .execute();
    await this.createQueryBuilder()
      .relation(Article, 'category')
      .of({ id: idOfArticleNeedEdit })
      .set(category);
    const actualRelationships = await this.createQueryBuilder()
      .relation(Article, 'tags')
      .of({ id: idOfArticleNeedEdit })
      .loadMany();
    return this.createQueryBuilder()
      .relation(Article, 'tags')
      .of({ id: idOfArticleNeedEdit })
      .addAndRemove(tags, actualRelationships);
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
