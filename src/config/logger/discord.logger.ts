import { Logger } from '@nestjs/common';
import axios from 'axios';
import { MessageDiscordLogger } from './message.discord.logger.dto';

const discordWebhookURL =
  'https://discordapp.com/api/webhooks/738206710333833228/-jwIaDhwkJ6xB0W4baoTxbfO9CBAKL1Mv8xKnIuHfcgjiE73KjHfKJQ9l44HeCps-XVD?wait=true' ||
  process.env.DISCORD_WEBHOOK_URL;

export default class DiscordLogger extends Logger {
  log(message: any, context?: string) {
    if (message instanceof MessageDiscordLogger)
      axios({
        method: 'POST',
        url: discordWebhookURL,
        data: JSON.stringify(message),
        headers: {
          'content-type': 'application/json',
        },
      }).catch(error => console.log(error.message));

    super.log(message.content ? message.content : message, context);
  }
}
