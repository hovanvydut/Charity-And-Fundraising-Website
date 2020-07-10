import { Module } from '@nestjs/common';
import { CampaignController } from './campaign.controller';
import { CampaignService } from './campaign.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampaignRepository } from './campaign.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CampaignRepository])],
  controllers: [CampaignController],
  providers: [CampaignService],
  exports: [CampaignService],
})
export class CampaignModule {}
