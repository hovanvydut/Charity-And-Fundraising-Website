import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AuthRedirectMiddleware } from 'src/auth/auth.middleware';

@Module({
  controllers: [AdminController],
})
export class AdminModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthRedirectMiddleware).forRoutes('/admin/auth/login');
  }
}
