require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import * as flash from 'connect-flash-plus';
import * as session from 'express-session';
import passport = require('passport');
import * as PostgreSqlStore from 'connect-pg-simple';
import * as methodOverride from 'method-override';

console.log(process.env);

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const logger = new Logger('bootstrap');

  app.useStaticAssets(join(__dirname, '..', 'public'), { prefix: '/public' });
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');

  const connectDBString = process.env.DB_URI;
  app.use(
    session({
      store: new (PostgreSqlStore(session))({
        conObject: {
          connectionString: connectDBString,
          ssl: {
            rejectUnauthorized: false,
          },
        },
      }),
      secret: 'secretSession',
      resave: true,
      saveUninitialized: false,
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());
  app.use(methodOverride('_method'));
  const port = process.env.PORT || 3000;
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}

bootstrap();
