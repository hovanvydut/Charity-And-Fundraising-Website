import {
  Controller,
  Get,
  Post,
  Body,
  Render,
  Req,
  Query,
  ParseIntPipe,
  Param,
  Patch,
  Delete,
  UseGuards,
  UseFilters,
} from '@nestjs/common';
import { ContactMessageDto } from './dto/contact_message.dto';
import { ContactService } from './contact.service';
import { ContactMessageValidationPipe } from './pipe/contact_messaage.validate';
import { GetUser } from 'src/user/other/get_user.decorator';
import { User } from 'src/user/user.entity';
import { GetFlashMessage } from 'src/user/other/get_flash_message';
import { FlashMessageDto } from 'src/user/dto/flash_message';
import { UpdateContactMessageDto } from './dto/update_contact_message.dto';
import { throwError } from 'rxjs';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { RoleEnum } from 'src/user/other/user_role.enum';
import { AuthExceptionFilter } from 'src/auth/filter/auth_exceptions.filter';
import { AuthenticatedGuard } from 'src/auth/guard/authenticated.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import DiscordLogger from 'src/config/logger/discord.logger';
import { MessageDiscordLogger } from 'src/config/logger/message.discord.logger.dto';

@Controller()
@Roles(RoleEnum.ADMIN, RoleEnum.MOD)
@UseGuards(AuthenticatedGuard, RolesGuard)
@UseFilters(AuthExceptionFilter)
export class ContactController {
  private discordLogger = new DiscordLogger();

  constructor(private contactService: ContactService) {}

  @Post('/contact/contact-message')
  contactMessage(
    @Body(new ContactMessageValidationPipe())
    contactMessageDto: ContactMessageDto,
  ) {
    const logMessage: MessageDiscordLogger = new MessageDiscordLogger(
      `There is a NEW CONTACT MESSAGE`,
    );
    this.discordLogger.log(logMessage);

    return this.contactService.saveContactMessage(contactMessageDto);
  }

  @Post('/contact/volunteer-message')
  volunteerMessage() {}

  @Post('/contact/sponsor-message')
  sponsorMessage() {}

  // server
  @Get('/admin/contact/contact-message/:id')
  async findContactMessage(@Param('id', ParseIntPipe) id: number) {
    const contactMessages = await this.contactService.findContactMessageById(
      id,
    );
    console.log(contactMessages);
    return {
      contactMessages,
    };
  }

  @Patch('/admin/contact/contact-message/:id')
  async updateContactMessage(
    @Body() updateContactMessageDto: UpdateContactMessageDto,
  ) {
    await this.contactService.updateContactMessage(updateContactMessageDto);
  }

  @Delete('/admin/contact/contact-message/:id')
  async deleteContactMessage(@Param('id', ParseIntPipe) id: number) {
    const result = await this.contactService.deleteContactMessage(id);
    if (result.affected == 0) throw new Error('Id của tin nhắn không tồn tại');
  }

  @Get('/admin/contact/contact-message')
  @Render('admin/page/contact/contact_message')
  async viewContactMessage(@GetUser() currentUser: User, @Req() req) {
    const contactMessages = await this.contactService.getAllContactMessages();
    const messageFlash = req.flash('message');
    return {
      user: currentUser,
      contactMessages,
      message: {
        status: messageFlash[0],
        contents: messageFlash.slice(1),
      },
    };
  }
}
