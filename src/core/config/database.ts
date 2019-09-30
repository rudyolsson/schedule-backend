import * as dotenv from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// need to be outside nest to be use from typeorm cli
function getDatabase(): TypeOrmModuleOptions {
  if (!Boolean(process.env.NODE_ENV === 'production')) {
    dotenv.config({ path: '.env' });
  }

  return {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_ACCESS_KEY,
    database: process.env.DATABASE_NAME,
    entities:
      process.env.NODE_ENV === 'production'
        ? ['dist/**/*.entity.js']
        : ['src/**/*.entity.ts'],

    synchronize: true,
    migrationsRun: false,
    logging: false,
    migrations:
      process.env.NODE_ENV === 'production'
        ? ['dist/core/database/migrations/**/*.js']
        : ['src/core/database/migrations/**/*.ts'],
    cli: {
      // Location of migration should be inside src folder
      // to be compiled into dist/ folder.
      migrationsDir: 'src/core/database/migrations',
    },
  };
}

const database = getDatabase();

export = database;
