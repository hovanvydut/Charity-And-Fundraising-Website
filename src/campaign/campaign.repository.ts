import { EntityRepository, Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { Campaign } from './campaign.entity';
import { CreateCampaignDto } from './dto/create_campaign.dto';
const getSlug = require('speakingurl');

@EntityRepository(Campaign)
export class CampaignRepository extends Repository<Campaign> {
  private logger = new Logger();

  createCampaign(createCampaignDto: CreateCampaignDto) {
    return this.createQueryBuilder()
      .insert()
      .values({
        ...createCampaignDto,
        slug: getSlug(createCampaignDto.name + '-' + Date.now()),
      })
      .returning('*')
      .execute();
  }
}
