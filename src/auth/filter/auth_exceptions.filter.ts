import {
  Catch,
  HttpException,
  ExceptionFilter,
  ArgumentsHost,
  UnauthorizedException,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class AuthExceptionFilter implements ExceptionFilter {
  private logger = new Logger();

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (
      exception instanceof UnauthorizedException ||
      exception instanceof ForbiddenException
    ) {
      // request.flash('loginError', 'Please try again!');
      this.logger.error(exception, null, 'AuthExceptionFilter');
      response.redirect('/admin/auth/login');
    } else {
      this.logger.error(exception, null, 'AuthExceptionFilter');
      response.redirect('/admin/error');
    }
  }
}
