require('dotenv').config();

console.log(process.env.DB_PASSWORD);

module.exports = {
  type: process.env.DB_TYPE,
  host: process.env.DB_HOSTNAME,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: process.env.TYPEORM_SYNC,
  logging: false,
  migrations: ['src/config/migrations/**/*.ts'],
  cli: {
    migrationsDir: 'src/config/migrations',
  },
  ssl: {
    rejectUnauthorized: false,
  },
};
