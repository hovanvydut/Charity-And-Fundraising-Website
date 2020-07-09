import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { BlogModule } from 'src/blog/blog.module';
import { ClientService } from './client.service';

@Module({
  imports: [BlogModule],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
