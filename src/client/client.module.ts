import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { BlogModule } from 'src/blog/blog.module';
import { ClientService } from './client.service';
import { CampaignModule } from 'src/campaign/campaign.module';

@Module({
  imports: [BlogModule, CampaignModule],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
