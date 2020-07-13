import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const dbConfig = config.get('db');

console.log(dbConfig);

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: 'ec2-52-86-33-50.compute-1.amazonaws.com',
  port: 5432,
  username: 'flajjtnsyrsljm',
  password: '912b7a48de6f62aaff2377e4438403e2f2e9357bbd298f029d891c4126f57376',
  database: 'df1ds8sa5m9lpc',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: false,
  ssl: {
    rejectUnauthorized: false,
  },
  migrations: [__dirname + '../migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};
