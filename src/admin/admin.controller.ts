import {
  Controller,
  Get,
  Render,
  UseGuards,
  Post,
  Request,
  Redirect,
  Response,
  UseFilters,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { LoginGuard } from 'src/auth/login.guard';
import { AuthExceptionFilter } from 'src/auth/auth-exceptions.filter';

@Controller('admin/')
@UseFilters(AuthExceptionFilter)
export class AdminController {
  @Get()
  @UseGuards(AuthenticatedGuard)
  @Render('admin/index')
  adminHomePage() {
    return {};
  }

  @Get('auth/login')
  @Render('admin/pages-login')
  loginPage() {
    return {};
  }

  @Post('auth/login')
  @UseGuards(LoginGuard)
  @Redirect('/admin')
  handleLogin(@Request() req) {
    return req.user;
  }

  @Get('auth/logout')
  logout(@Request() req, @Response() res) {
    req.logout();
    res.redirect('/admin/auth/login');
  }
}
