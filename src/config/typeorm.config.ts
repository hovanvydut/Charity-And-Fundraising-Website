require('dotenv').config();
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const dbConfig = config.get('db');

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres' || process.env.DB_TYPE || dbConfig.type,
  host: 'arjuna.db.elephantsql.com' || process.env.DB_HOSTNAME || dbConfig.host,
  port: 5432 || process.env.PORT || dbConfig.port,
  username: 'yjcrmgct' || process.env.DB_USERNAME || dbConfig.username,
  password:
    '0ETzEiPPF6nwvz12q8DoauCOPubACy6T' ||
    process.env.DB_PASSWORD ||
    dbConfig.password,
  database: 'yjcrmgct' || process.env.DB_NAME || dbConfig.database,
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
  ssl: {
    rejectUnauthorized: false,
  },
  migrations: [__dirname + '../migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};
