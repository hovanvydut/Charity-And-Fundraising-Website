import {
  Controller,
  Get,
  Render,
  UseGuards,
  UseFilters,
  Req,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  Redirect,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { RoleEnum } from 'src/user/other/user_role.enum';
import { AuthenticatedGuard } from 'src/auth/guard/authenticated.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { AuthExceptionFilter } from 'src/auth/filter/auth_exceptions.filter';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateArticleDto } from './dto/create_article.dto';
import { BlogService } from './blog.service';
import { GetUser } from 'src/user/other/get_user.decorator';
import { User } from 'src/user/user.entity';
import { Article } from './article.entity';

@Controller('admin/blog')
@Roles(RoleEnum.ADMIN, RoleEnum.MOD)
@UseGuards(AuthenticatedGuard, RolesGuard)
@UseFilters(AuthExceptionFilter)
export class BlogController {
  constructor(private blogService: BlogService) {}
  // ! chức năng xem tất cả bài viết chỉ dành cho admin(reflect override)
  // ! chức năng bài viết của bạn
  // ! viet interceptor tra ve req.user kem
  @Get('articles')
  @Render('admin/page/blog/articles')
  async viewArticles(@Req() req, @GetUser() user: User) {
    const articles: Article[] = await this.blogService.getArticles();
    return {
      user,
      message: {
        status: 'error',
        contents: req.flash('error'),
      },
      articles,
    };
  }

  @Get('my-articles')
  @Render('admin/page/blog/articles')
  viewMyArticles(@Req() req) {
    return {
      user: req.user,
      message: {
        status: 'error',
        contents: req.flash('error'),
      },
    };
  }

  @Get('write-article')
  @Render('admin/page/blog/write_article')
  viewWriteArticle(@Req() req) {
    return {
      user: req.user,
      message: {
        status: 'error',
        contents: req.flash('error'),
      },
    };
  }

  @Post('write-article')
  @Redirect('/admin/blog/articles')
  async saveArticle(
    @Body() createArticleDto: CreateArticleDto,
    @GetUser() user: User,
  ) {
    await this.blogService.saveArticle(createArticleDto, user);
  }

  @Post('upload-image')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file) {
    console.log(file);
  }
}
