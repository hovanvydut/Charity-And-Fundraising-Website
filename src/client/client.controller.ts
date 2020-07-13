import { Controller, Get, Render, Param, Query } from '@nestjs/common';
import { BlogService } from 'src/blog/blog.service';
import { Like, FindOperator } from 'typeorm';
import { stringify } from 'querystring';
import { ClientService } from './client.service';
import { QueryBlogDto } from 'src/blog/dto/query_blog.dto';
import { CampaignService } from 'src/campaign/campaign.service';

@Controller()
export class ClientController {
  constructor(
    private blogService: BlogService,
    private clientService: ClientService,
    private campaignService: CampaignService,
  ) {}

  @Get()
  @Render('client/page/index')
  async homePage() {
    const campaignList = await this.campaignService.getAllCampaignThumb();
    const topArticles = await this.blogService.getThumbnailArticle({}, 3);
    return { campaignList, topArticles };
  }

  @Get('/about')
  @Render('client/page/About')
  aboutPage() {
    return {};
  }

  @Get('/campaign/:slug')
  @Render('client/page/detail_campaign')
  async detailCampaignPage(@Param('slug') slug: string) {
    const deatailCampaign = await this.campaignService.findBy({ slug });
    return { deatailCampaign };
  }

  @Get('/campaign')
  @Render('client/page/campaign')
  async campaignPage() {
    const campaignList = await this.campaignService.getAllCampaignThumb();
    return { campaignList };
  }

  @Get('/blog')
  @Render('client/page/blog')
  async blogPage(@Query() queryBlogDto: QueryBlogDto) {
    const articleDatas = await this.clientService.getAllThumbArticleWithQuery(
      queryBlogDto,
    );
    const tags = await this.blogService.getAllTags();
    const categories = await this.blogService.getAllCategories();
    console.log(categories);
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
    const tags = await this.blogService.getAllTags();
    const categories = await this.blogService.getAllCategories();
    return { articleData, tags, categories };
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
