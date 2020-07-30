import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import DiscordLogger from 'src/config/logger/discord.logger';
import { MessageDiscordLogger } from 'src/config/logger/message.discord.logger.dto';
import { RoleEnum } from 'src/user/other/user_role.enum';

@Injectable()
export class LoginGuard extends AuthGuard('local') {
  private discordLogger = new DiscordLogger();

  async canActivate(context: ExecutionContext) {
    const result = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    // create session for subsequent request
    await super.logIn(request);
    const logMessage: MessageDiscordLogger = new MessageDiscordLogger(
      `${RoleEnum[request.user.role]} @${
        request.user.name
      } has logged in #email: ${request.user.email}`,
    );
    this.discordLogger.log(logMessage);
    return result;
  }
}
