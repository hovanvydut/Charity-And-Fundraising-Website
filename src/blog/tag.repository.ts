import { EntityRepository, Repository } from 'typeorm';
import { CreateTagDto } from './dto/create_tag.dto';
import { Logger } from '@nestjs/common';
import { Tag } from './tag.entity';
const getSlug = require('speakingurl');

@EntityRepository(Tag)
export class TagRepository extends Repository<Tag> {
  private logger = new Logger();

  createTag(createTagDto: CreateTagDto) {
    const record = {
      ...createTagDto,
      slug: getSlug(createTagDto.name),
    };
    return this.createQueryBuilder()
      .insert()
      .values(record)
      .returning('*')
      .execute();
  }
}
