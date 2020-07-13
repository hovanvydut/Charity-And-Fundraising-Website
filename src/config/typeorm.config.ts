import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const dbConfig = config.get('db');

console.log(dbConfig);

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: process.env.DB_HOSTNAME || dbConfig.host,
  port: process.env.PORT || dbConfig.port,
  username: process.env.DB_USERNAME || dbConfig.username,
  password: process.env.DB_PASSWORD || dbConfig.password,
  database: process.env.DB_NAME || dbConfig.database,
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: process.env.TYPEORM_SYNC || dbConfig.synchronize,
  ssl: {
    rejectUnauthorized: false,
  },
};
