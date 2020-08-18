import { Injectable } from '@nestjs/common';
import { CreateCampaignDto } from './dto/create_campaign.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CampaignRepository } from './campaign.repository';
const getSlug = require('speakingurl');

@Injectable()
export class CampaignService {
  constructor(
    @InjectRepository(CampaignRepository)
    private campaignRepository: CampaignRepository,
  ) {}

  countCampaigns() {
    return this.campaignRepository.count();
  }

  findBy(condition: object) {
    return this.campaignRepository.findOne(condition);
  }

  getAllCampaign() {
    return this.campaignRepository.find();
  }

  getAllCampaignThumb() {
    return this.campaignRepository
      .createQueryBuilder()
      .select(['id', 'name', 'thumbnail', 'description', 'slug', 'status'])
      .execute();
  }

  getTopArticles(number: number) {
    return this.campaignRepository
      .createQueryBuilder()
      .select([
        'id',
        'name',
        'thumbnail',
        'description',
        'slug',
        'status',
        'created_at',
      ])
      .limit(number)
      .execute();
  }

  getCampaignById(id: number) {
    return this.campaignRepository.findOne({ id });
  }

  createCampaign(createCampaignDto: CreateCampaignDto) {
    return this.campaignRepository.createCampaign(createCampaignDto);
  }

  deleteById(id: number) {
    return this.campaignRepository.delete({ id });
  }

  updateCampaign(idOfCampaign, updateCampaignDto) {
    return this.campaignRepository.update(
      { id: idOfCampaign },
      {
        ...updateCampaignDto,
        slug: getSlug(updateCampaignDto.name),
      },
    );
  }
}
