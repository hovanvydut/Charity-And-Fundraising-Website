import { EntityRepository, Repository } from 'typeorm';
import { Article } from './article.entity';

@EntityRepository(Article)
export class ArticleRepository extends Repository<Article> {}
