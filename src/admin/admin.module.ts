import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AuthRedirectMiddleware } from 'src/auth/auth.middleware';
import { UserModule } from 'src/user/user.module';
import { CampaignModule } from 'src/campaign/campaign.module';
import { BlogModule } from 'src/blog/blog.module';

@Module({
  imports: [UserModule, BlogModule, CampaignModule],
  controllers: [AdminController],
})
export class AdminModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthRedirectMiddleware).forRoutes('/admin/auth/login');
  }
}
