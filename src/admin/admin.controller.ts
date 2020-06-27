import { Controller, Get, Render } from '@nestjs/common';

@Controller('admin')
export class AdminController {
  @Get()
  @Render('admin/index')
  adminHomePage() {
    return {};
  }

  @Get('/auth/login')
  @Render('admin/pages-login')
  loginPage() {
    return {};
  }
}
