import {
  Controller,
  Get,
  Render,
  UseGuards,
  Post,
  Req,
  Redirect,
  Res,
  UseFilters,
  Body,
  Logger,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/guard/authenticated.guard';
import { AuthExceptionFilter } from 'src/auth/filter/auth_exceptions.filter';
import { UserService } from 'src/user/user.service';
import { GetUser } from 'src/user/other/get_user.decorator';
import { BlogService } from 'src/blog/blog.service';
import { CampaignService } from 'src/campaign/campaign.service';

@Controller('admin/')
@UseFilters(AuthExceptionFilter)
export class AdminController {
  private logger = new Logger();
  constructor(
    private userService: UserService,
    private blogService: BlogService,
    private campaignService: CampaignService,
  ) {}

  @Get()
  @UseGuards(AuthenticatedGuard)
  @Render('admin/page/home/index')
  async adminHomePage(@GetUser() user) {
    const countVolunteers = await this.userService.countVolunteers();
    const countArticles = await this.blogService.countArticles();
    const countCampaigns = await this.campaignService.countCampaigns();
    return {
      user,
      count: {
        volunteers: countVolunteers,
        articles: countArticles,
        campaigns: countCampaigns,
      },
    };
  }
}
