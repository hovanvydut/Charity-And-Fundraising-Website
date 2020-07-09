import { Controller, Get, Render, Param, Query } from '@nestjs/common';
import { BlogService } from 'src/blog/blog.service';
import { Like, FindOperator } from 'typeorm';
import { stringify } from 'querystring';
import { ClientService } from './client.service';
import { QueryBlogDto } from 'src/blog/dto/query_blog.dto';

@Controller()
export class ClientController {
  constructor(
    private blogService: BlogService,
    private clientService: ClientService,
  ) {}

  @Get()
  @Render('client/page/index')
  homePage() {
    return {};
  }

  @Get('/about')
  @Render('client/page/About')
  aboutPage() {
    return {};
  }

  @Get('/blog')
  @Render('client/page/blog')
  async blogPage(@Query() queryBlogDto: QueryBlogDto) {
    const articleDatas = await this.clientService.getAllThumbArticleWithQuery(
      queryBlogDto,
    );
    console.log(articleDatas);
    const tags = await this.blogService.getAllTags();
    const categories = await this.blogService.getAllCategories();
    return {
      articleDatas,
      tags,
      categories,
    };
  }

  @Get('/blog/:slug')
  @Render('client/page/single_blog')
  async viewSingleBlog(@Param('slug') slug: string) {
    const articleData = await this.blogService.getArticleBySlug(slug);
    return { articleData };
  }

  @Get('/campaign')
  @Render('client/page/campaign')
  causePage() {
    return {};
  }

  @Get('/contact')
  @Render('client/page/contact')
  contactPage() {
    return {};
  }
}
