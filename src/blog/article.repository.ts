import { EntityRepository, Repository } from 'typeorm';
import { Article } from './article.entity';
import { User } from 'src/user/user.entity';
import { InternalServerErrorException, Logger } from '@nestjs/common';

@EntityRepository(Article)
export class ArticleRepository extends Repository<Article> {
  private logger = new Logger();

  async saveArticle(createArticleDto, user: User): Promise<void> {
    const { title, content } = createArticleDto;
    const article = new Article();

    article.title = title;
    article.content = content;
    article.author = user;

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
      .getMany();
  }
}
