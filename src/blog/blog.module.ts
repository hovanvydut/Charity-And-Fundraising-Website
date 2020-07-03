import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleRepository } from './article.repository';

@Module({
  imports: [
    MulterModule.register({
      storage: './../../public/upload',
    }),
    TypeOrmModule.forFeature([ArticleRepository]),
  ],
  providers: [BlogService],
  controllers: [BlogController],
})
export class BlogModule {}
