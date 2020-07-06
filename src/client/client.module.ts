import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { BlogModule } from 'src/blog/blog.module';

@Module({
  imports: [BlogModule],
  controllers: [ClientController],
})
export class ClientModule {}
