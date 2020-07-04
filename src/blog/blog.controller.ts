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
  Param,
  ParseIntPipe,
  Patch,
  Res,
  Delete,
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
import { UpdateArticleDto } from './dto/update_article.dto';

@Controller('admin/blog')
@Roles(RoleEnum.ADMIN, RoleEnum.MOD)
@UseGuards(AuthenticatedGuard, RolesGuard)
@UseFilters(AuthExceptionFilter)
export class BlogController {
  constructor(private blogService: BlogService) {}
  //! Viet interceptor dinh kem object message flash each response

  @Get('my-articles')
  @Render('admin/page/blog/articles')
  viewMyArticles(@Req() req) {
    const messageFlash = req.flash('message');
    return {
      user: req.user,
      message: {
        status: messageFlash[0],
        contents: messageFlash.slice(1),
      },
    };
  }

  @Get('write-article')
  @Render('admin/page/blog/write_article')
  viewWriteArticle(@Req() req) {
    const messageFlash = req.flash('message');
    return {
      user: req.user,
      message: {
        status: messageFlash[0],
        contents: messageFlash.slice(1),
      },
    };
  }

  @Post('write-article')
  @Redirect('/admin/blog/articles')
  async saveArticle(
    @Body() createArticleDto: CreateArticleDto,
    @GetUser() user: User,
    @Req() req,
  ) {
    await this.blogService.saveArticle(createArticleDto, user);
    req.flash('message', ['success', 'Bài viết đã lưu']);
  }

  @Post('upload-image')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file) {
    console.log(file);
  }

  @Get('articles')
  @Render('admin/page/blog/articles')
  async viewArticles(@Req() req, @GetUser() user: User) {
    const messageFlash = req.flash('message');
    const articles: Article[] = await this.blogService.getAllArticles();
    return {
      user,
      message: {
        status: messageFlash[0],
        contents: messageFlash.slice(1),
      },
      articles,
    };
  }

  @Get('articles/:id/edit')
  @Render('admin/page/blog/edit_article')
  async editArticle(
    @GetUser() user: User,
    @Param('id', ParseIntPipe) idOfArticleNeedEdit: number,
    @Req() req,
  ) {
    const messageFlash = req.flash('message');
    const articleData = await this.blogService.getArticleById(
      idOfArticleNeedEdit,
    );
    return {
      user,
      articleData,
      message: {
        status: messageFlash[0],
        contents: messageFlash.slice(1),
      },
    };
  }

  @Patch('articles/:id/update')
  async updateArticle(
    @Param('id', ParseIntPipe) idOfArticleNeedEdit: number,
    @Body() updateArticleDto: UpdateArticleDto,
    @Req() req,
    @Res() res,
  ) {
    await this.blogService.updateArticle(idOfArticleNeedEdit, updateArticleDto);
    req.flash('message', ['success', 'Cập nhật bài viết thành công']);
    return res.redirect(`/admin/blog/articles/${idOfArticleNeedEdit}/edit`);
  }

  @Delete('articles/:id/delete')
  async deleteArticle(
    @Param('id', ParseIntPipe) idOfArticleNeedDelete: number,
    @Req() req,
    @Res() res,
  ) {
    await this.blogService.deleteArticle(idOfArticleNeedDelete);
    req.flash('message', ['success', 'Xóa bài viết thành công']);
    return res.redirect(`/admin/blog/articles`);
  }
}
