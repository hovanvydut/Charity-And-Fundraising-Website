import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class AuthRedirectMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    if (!req.isAuthenticated()) return next();
    return res.redirect('/admin');
  }
}
