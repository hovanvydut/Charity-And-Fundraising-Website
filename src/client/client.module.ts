import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { BlogModule } from 'src/blog/blog.module';
import { ClientService } from './client.service';
import { CampaignModule } from 'src/campaign/campaign.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [BlogModule, CampaignModule, UserModule],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
