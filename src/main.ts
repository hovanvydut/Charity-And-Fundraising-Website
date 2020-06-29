import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import * as session from 'express-session';
import passport = require('passport');
import * as flash from 'connect-flash-plus';
import * as PostgreSqlStore from 'connect-pg-simple';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'), { prefix: '/public' });
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');

  const connectDBString =
    'postgres://postgres:123456@127.0.0.1:5432/Charity_Fundraising';
  app.use(
    session({
      store: new (PostgreSqlStore(session))({
        conString: connectDBString,
      }),
      secret: 'secretSession',
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());

  await app.listen(3000);
}
bootstrap();
