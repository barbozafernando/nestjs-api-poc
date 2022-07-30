import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { resolve } from 'path';

const SOURCE_PATH = resolve(__dirname, '..', '..', '..');

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly cfg: ConfigService) {}

  createTypeOrmOptions(name: string): TypeOrmModuleOptions {
    const defaultConfig = {
      type: 'postgres',
      name: 'default',
      host: this.cfg.get<string>('database.host'),
      port: this.cfg.get<number>('database.port'),
      username: this.cfg.get<string>('database.username'),
      password: this.cfg.get<string>('database.password'),
      database: this.cfg.get<string>('database.database'),
      entities: this.cfg.get<string[]>('orm.entities'),
      synchronize: this.cfg.get<boolean>('orm.synchronize'),
      migrations: this.cfg.get<string[]>('orm.migrations'),
      migrationsRun: this.cfg.get<boolean>('orm.migrationsRun'),
      cli: {
        entitiesDir: this.cfg.get<string>('orm.cli.entitiesDir'),
        migrationsDir: this.cfg.get<string>('orm.cli.migrationsDir'),
      },
    };

    const connections = {
      default: defaultConfig,
      seeder: {
        ...defaultConfig,
        name: 'seeder',
        migrations: this.cfg.get<string[]>('orm.seeds'),
      },
      test: {
        type: 'sqlite',
        name: 'test',
        keepConnectionAlive: true,
        database: ':memory:',
        dropSchema: true,
        synchronize: true,
        autoLoadEntities: true,
        entities: [`${SOURCE_PATH}/modules/**/entities/**/*.entity.{js,ts}`],
        migrations: ['dist/modules/database/seeds/**/*.js'],
      },
    };

    return connections[name] || defaultConfig;
  }
}
