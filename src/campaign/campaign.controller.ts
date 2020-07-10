import { Controller, Get, Render } from '@nestjs/common';
import { GetUser } from 'src/user/other/get_user.decorator';
import { userInfo } from 'os';
import { GetFlashMessage } from 'src/user/other/get_flash_message';
import { FlashMessageDto } from 'src/user/dto/flash_message';

@Controller('admin/campaign')
export class CampaignController {
  @Get('/general')
  @Render('admin/page/campaign/general')
  viewGeneral(@GetUser() user, @GetFlashMessage() message: FlashMessageDto) {
    return {
      user,
      message,
    };
  }
}
