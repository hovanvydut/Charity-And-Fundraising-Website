import {
  Controller,
  Get,
  Render,
  Post,
  UseGuards,
  Redirect,
  Req,
  UseFilters,
} from '@nestjs/common';
import { LoginGuard } from './guard/login.guard';
import { AuthenticatedGuard } from './guard/authenticated.guard';
import { AuthExceptionFilter } from './filter/auth_exceptions.filter';
@Controller('admin/auth')
@UseFilters(AuthExceptionFilter)
export class AuthController {
  @Get('login')
  @Render('admin/page/login/index')
  loginPage() {
    return {};
  }

  @Post('login')
  @UseGuards(LoginGuard)
  @Redirect('/admin')
  handleLogin() {}

  @Get('logout')
  @UseGuards(AuthenticatedGuard)
  @Redirect('login')
  logout(@Req() req) {
    req.logout();
  }
}
