import {
  Controller,
  Get,
  Render,
  Logger,
  Post,
  UseGuards,
  Redirect,
  Req,
} from '@nestjs/common';
import { LoginGuard } from './guard/login.guard';
import { AuthenticatedGuard } from './guard/authenticated.guard';

@Controller('admin/auth')
export class AuthController {
  private logger = new Logger();

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
