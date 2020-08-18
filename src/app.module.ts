import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { ClientModule } from './client/client.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionModule } from './session/session.module';
import { BlogModule } from './blog/blog.module';
import { ContactModule } from './contact/contact.module';
import { CampaignModule } from './campaign/campaign.module';
import { typeOrmConfig } from './config/typeorm.config';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    UserModule,
    AdminModule,
    ClientModule,
    SessionModule,
    BlogModule,
    ContactModule,
    CampaignModule,
  ],
})
export class AppModule {}
