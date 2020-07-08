import { EntityRepository, Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create_category.dto';
import { Logger } from '@nestjs/common';
const getSlug = require('speakingurl');

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  private logger = new Logger();

  createCategory(createCategoryDto: CreateCategoryDto) {
    const record = {
      ...createCategoryDto,
      slug: getSlug(createCategoryDto.name),
    };
    return this.createQueryBuilder()
      .insert()
      .values(record)
      .returning('*')
      .execute();
  }
}
