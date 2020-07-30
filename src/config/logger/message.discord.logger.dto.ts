export class MessageDiscordLogger {
  private content: string;
  private username = 'Charity_BOT';
  constructor(content: string, username?: string) {
    this.content = content;
  }
}
