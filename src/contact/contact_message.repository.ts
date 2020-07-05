import { Repository, EntityRepository } from 'typeorm';
import { ContactMessage } from './contact_message.entity';

@EntityRepository(ContactMessage)
export class ContactMessageRepository extends Repository<ContactMessage> {}
