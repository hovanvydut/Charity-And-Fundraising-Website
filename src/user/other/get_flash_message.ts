import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { FlashMessageDto } from '../dto/flash_message';

export const GetFlashMessage = createParamDecorator(
  (data, ctx: ExecutionContext): FlashMessageDto => {
    const req = ctx.switchToHttp().getRequest();
    const messageFlash = req.flash('message');
    return {
      status: messageFlash[0],
      contents: messageFlash.slice(1),
    };
  },
);
