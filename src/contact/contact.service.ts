import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactMessage } from './contact_message.entity';
import { ContactMessageRepository } from './contact_message.repository';
import { ContactMessageDto } from './dto/contact_message.dto';

@Injectable()
export class ContactService {
  private logger = new Logger();

  constructor(
    @InjectRepository(ContactMessageRepository)
    private contactMessageRepository: ContactMessageRepository,
  ) {}

  async saveContactMessage(contactMessageDto: ContactMessageDto) {
    try {
      const record = await this.contactMessageRepository
        .createQueryBuilder()
        .insert()
        .values(contactMessageDto)
        .returning('*')
        .execute();
      return {
        message: 'Cảm ơn bạn, chúng tôi sẽ sớm liên hệ với bạn sớm nhất! <3',
      };
    } catch (error) {
      this.logger.error(error.message, error.trace, 'ContactService');
      throw Error('Error when query');
    }
  }
}
