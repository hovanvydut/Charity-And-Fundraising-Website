import { Controller, Get, Render, Param, Query } from '@nestjs/common';
import { BlogService } from 'src/blog/blog.service';
import { Like, FindOperator } from 'typeorm';
import { stringify } from 'querystring';
import { ClientService } from './client.service';
import { QueryBlogDto } from 'src/blog/dto/query_blog.dto';
import { CampaignService } from 'src/campaign/campaign.service';
import { UserService } from 'src/user/user.service';
import { RoleEnum } from 'src/user/other/user_role.enum';

const carouselImgs = [
  'https://res.cloudinary.com/dgext7ewd/image/upload/v1597760761/Charity_And_Fundraising/upload/carousel/4_zhaebu.jpg',
  'https://res.cloudinary.com/dgext7ewd/image/upload/v1597760760/Charity_And_Fundraising/upload/carousel/2_ojuzyw.jpg',
  'https://res.cloudinary.com/dgext7ewd/image/upload/v1597760762/Charity_And_Fundraising/upload/carousel/9_pprcwn.jpg',
  'https://res.cloudinary.com/dgext7ewd/image/upload/v1597760763/Charity_And_Fundraising/upload/carousel/12_c7nvek.jpg',
  'https://res.cloudinary.com/dgext7ewd/image/upload/v1597760763/Charity_And_Fundraising/upload/carousel/13_yv6zdj.jpg',
  'https://res.cloudinary.com/dgext7ewd/image/upload/v1597760763/Charity_And_Fundraising/upload/carousel/7_eipbof.jpg',
  'https://res.cloudinary.com/dgext7ewd/image/upload/v1597760765/Charity_And_Fundraising/upload/carousel/10_szpt4r.jpg',
  'https://res.cloudinary.com/dgext7ewd/image/upload/v1597760761/Charity_And_Fundraising/upload/carousel/6_pfd3aq.jpg',
];
@Controller()
export class ClientController {
  constructor(
    private blogService: BlogService,
    private clientService: ClientService,
    private campaignService: CampaignService,
    private userService: UserService,
  ) {}

  @Get()
  @Render('client/page/index')
  async homePage() {
    const campaignList = await this.campaignService.getAllCampaignThumb();
    const topArticles = await this.blogService.getThumbnailArticle({}, 4);

    let volunteers = await this.userService.getUsers({
      role: RoleEnum.VOLUNTEER,
    });
    volunteers = volunteers
      ? volunteers.map(people => {
          const { name, avatar, email } = people;
          return { name, avatar, email };
        })
      : [];
    return { campaignList, topArticles, volunteers, carouselImgs };
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

    return {
      articleDatas,
      tags,
      categories,
      topArticles: articleDatas.slice(
        0,
        articleDatas.length > 3 ? 3 : articleDatas.length,
      ),
    };
  }

  @Get('/blog/:slug')
  @Render('client/page/single_blog')
  async viewSingleBlog(@Param('slug') slug: string) {
    const articleData = await this.blogService.getArticleBySlug(slug);
    const tags = await this.blogService.getAllTags();
    const categories = await this.blogService.getAllCategories();
    const topArticles = await this.blogService.getThumbnailArticle({}, 4);
    return { articleData, tags, categories, topArticles };
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
