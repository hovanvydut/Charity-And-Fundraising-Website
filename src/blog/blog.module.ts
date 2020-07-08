import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleRepository } from './article.repository';
import { CategoryRepository } from './category.repository';
import { TagRepository } from './tag.repository';

@Module({
  imports: [
    MulterModule,
    TypeOrmModule.forFeature([
      ArticleRepository,
      CategoryRepository,
      TagRepository,
    ]),
  ],
  providers: [BlogService],
  controllers: [BlogController],
  exports: [BlogService],
})
export class BlogModule {}
