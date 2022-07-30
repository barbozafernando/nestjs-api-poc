import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { resolve } from 'path';

const SOURCE_PATH = resolve(__dirname, '..', '.');

/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();

const options: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: Number(process.env.DATABASE_PORT) || 5432,
  username: process.env.POSTGRESQL_USER || 'postgres',
  password: process.env.POSTGRESQL_PASSWORD || '',
  database: process.env.POSTGRESQL_DATABASE || '',
  entities: [
    `${SOURCE_PATH}/**/*.entity.{js,ts}`,
    'dist/modules/**/entities/**/*.entity.{js,ts}',
  ],
  migrations: [
    `dist/modules/**/database/migrations/*.js`,
    'src/modules/database/migrations',
  ],
  synchronize: true,
};

const dataSource = new DataSource(options);

export default dataSource;
