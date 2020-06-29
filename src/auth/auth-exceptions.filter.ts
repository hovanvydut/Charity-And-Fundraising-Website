import {
  Catch,
  HttpException,
  ExceptionFilter,
  ArgumentsHost,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class AuthExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (
      exception instanceof UnauthorizedException ||
      exception instanceof ForbiddenException
    ) {
      // request.flash('loginError', 'Please try again!');
      response.redirect('/admin/auth/login');
    } else {
      response.redirect('/admin/error');
    }
  }
}
