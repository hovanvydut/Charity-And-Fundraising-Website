import { Controller, Get, Post, Body, Render, Req } from '@nestjs/common';
import { ContactMessageDto } from './dto/contact_message.dto';
import { ContactService } from './contact.service';
import { ContactMessageValidationPipe } from './pipe/contact_messaage.validate';
import { GetUser } from 'src/user/other/get_user.decorator';
import { User } from 'src/user/user.entity';

@Controller()
export class ContactController {
  constructor(private contactService: ContactService) {}

  @Post('/contact/contact-message')
  contactMessage(
    @Body(new ContactMessageValidationPipe())
    contactMessageDto: ContactMessageDto,
  ) {
    return this.contactService.saveContactMessage(contactMessageDto);
  }

  @Post('/contact/volunteer-message')
  volunteerMessage() {}

  @Post('/contact/sponsor-message')
  sponsorMessage() {}

  // server
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
