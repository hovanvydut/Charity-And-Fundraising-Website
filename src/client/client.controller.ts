import { Controller, Get, Render, Param } from '@nestjs/common';
import { BlogService } from 'src/blog/blog.service';

@Controller()
export class ClientController {
  constructor(private blogService: BlogService) {}

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
  async blogPage() {
    const articleDatas = await this.blogService.getThumbnailArticle();
    return {
      articleDatas,
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
