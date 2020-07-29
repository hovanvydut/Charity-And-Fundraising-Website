require('dotenv').config();
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'arjuna.db.elephantsql.com' || process.env.DB_HOSTNAME,
  port: 5432 || +process.env.PORT,
  username: 'yjcrmgct' || process.env.DB_USERNAME,
  password: '0ETzEiPPF6nwvz12q8DoauCOPubACy6T' || process.env.DB_PASSWORD,
  database: 'yjcrmgct' || process.env.DB_NAME,
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
