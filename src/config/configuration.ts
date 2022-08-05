/* istanbul ignore file */
import { resolve } from 'path';

const SOURCE_PATH = resolve(__dirname, '..', '.');

export default () => ({
  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: Number(process.env.DATABASE_PORT) || 5432,
    username: process.env.POSTGRESQL_USER || 'postgres',
    password: process.env.POSTGRESQL_PASSWORD || 'postgres',
    database: process.env.POSTGRESQL_DB || 'postgres',
  },
  orm: {
    synchronize: true,
    migrationsRun: true,
    entities: [
      `${SOURCE_PATH}/**/*.entity.{js,ts}`,
      'dist/modules/**/entities/**/*.entity.{js,ts}',
    ],
    seeds: ['dist/modules/database/seeders/*.js'],
    migrations: [
      `dist/modules/**/database/migrations/*.js`,
      'src/modules/database/migrations',
    ],
    cli: {
      entitiesDir: 'src/modules/**/entity',
      migrationsDir: 'src/modules/database/migrations',
    },
  },
});
