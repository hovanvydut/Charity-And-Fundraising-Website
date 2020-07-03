import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionService } from './session.service';
import { SessionRepository } from './session.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SessionRepository])],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionModule {}
