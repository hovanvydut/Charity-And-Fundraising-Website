import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactMessageRepository } from './contact_message.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ContactMessageRepository])],
  providers: [ContactService],
  controllers: [ContactController],
})
export class ContactModule {}
