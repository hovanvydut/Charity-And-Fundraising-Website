import { Injectable } from '@nestjs/common';
import { BlogService } from 'src/blog/blog.service';
import { QueryBlogDto } from 'src/blog/dto/query_blog.dto';
import { ConditionQuery } from 'src/blog/dto/condition_query.dto';

@Injectable()
export class ClientService {
  constructor(private blogService: BlogService) {}
  getAllThumbArticleWithQuery(queryBlogDto: QueryBlogDto) {
    const conditionQuery: ConditionQuery = new ConditionQuery();
    if (queryBlogDto.keyword) {
      conditionQuery.titleSlug = `%${queryBlogDto.keyword
        .toLowerCase()
        .replace(/\s(?=\s)/g, '')
        .split(' ')
        .join('-')}%`;
    }
    if (queryBlogDto.category) {
      conditionQuery.categorySlug = queryBlogDto.category;
    }
    if (queryBlogDto.tag) {
      conditionQuery.tagSlug = queryBlogDto.tag;
    }
    return this.blogService.getThumbnailArticle(conditionQuery);
  }
}
