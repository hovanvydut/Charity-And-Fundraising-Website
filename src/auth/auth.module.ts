import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './other/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { SessionSerializer } from './other/session.serializer';
import { AuthController } from './auth.controller';

@Module({
  imports: [UserModule, PassportModule],
  providers: [AuthService, LocalStrategy, SessionSerializer],
  controllers: [AuthController],
})
export class AuthModule {}
