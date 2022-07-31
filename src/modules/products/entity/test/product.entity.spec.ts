import { Test, TestingModule } from '@nestjs/testing';
import { Products } from '../product.entity';

describe('ProductEntity', () => {
  let entity: Products;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Products],
    }).compile();

    entity = module.get<Products>(Products);
  });

  it('should be defined', () => {
    expect(entity).toBeDefined();
  });

  it('should be instance of Products', () => {
    expect(entity).toBeInstanceOf(Products);
  });
});
