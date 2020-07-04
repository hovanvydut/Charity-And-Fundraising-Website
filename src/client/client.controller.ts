import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class ClientController {
  @Get()
  @Render('client/page/index')
  homePage() {
    return {};
  }

  @Get('/about')
  @Render('client/page/About')
  aboutPage() {
    return {};
  }

  @Get('/blog')
  @Render('client/page/blog')
  blogPage() {
    return {};
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
