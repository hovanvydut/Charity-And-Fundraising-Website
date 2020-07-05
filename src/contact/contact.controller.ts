import { Controller, Get, Post, Body } from '@nestjs/common';
import { ContactMessageDto } from './dto/contact_message.dto';
import { ContactService } from './contact.service';
import { ContactMessageValidationPipe } from './pipe/contact_messaage.validate';

@Controller()
export class ContactController {
  constructor(private contactService: ContactService) {}

  @Post('/contact/contact-message')
  contactMessage(
    @Body(new ContactMessageValidationPipe())
    contactMessageDto: ContactMessageDto,
  ) {
    console.log(contactMessageDto);
    return this.contactService.saveContactMessage(contactMessageDto);
  }

  @Post('/contact/volunteer-message')
  volunteerMessage() {}

  @Post('/contact/sponsor-message')
  sponsorMessage() {}
}
