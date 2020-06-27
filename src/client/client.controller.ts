import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class ClientController {
  @Get()
  @Render('client/index')
  homePage() {
    return {};
  }
}
