import configuration from '../../config/configuration';
import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { resolve } from 'path';
import { ProductController } from './controller/product.controller';
import { ProductModule } from './product.module';

describe('ProductsModule', () => {
  const SOURCE_PATH = resolve(__dirname, '..', '..');
  const PATH = `${SOURCE_PATH}/**/entities/**/*.entity.ts`;

  let controller: ProductController;
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ProductModule,
        ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          dropSchema: true,
          entities: [PATH],
        }),
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    app = module.createNestApplication();

    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
