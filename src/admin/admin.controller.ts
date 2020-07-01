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

@Controller('admin/')
@UseFilters(AuthExceptionFilter)
export class AdminController {
  private logger = new Logger();
  constructor(private userService: UserService) {}

  @Get()
  @UseGuards(AuthenticatedGuard)
  @Render('admin/page/home/index')
  adminHomePage(@Req() req) {
    return { user: req.user };
  }
}
