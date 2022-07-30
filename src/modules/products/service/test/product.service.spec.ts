import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../../service/product.service';
import { createMock } from '@golevelup/ts-jest';
import { ProductsDTO } from '../../dto/create-products.dto';
import { Products } from '../../entity/product.entity';
import dataSource from '../../../../config/postgres-data-source';

describe('ProductService', () => {
  let productService: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [ProductService],
    }).compile();

    productService = module.get<ProductService>(ProductService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  beforeAll(async () => await dataSource.initialize());
  afterAll(async () => await dataSource.destroy());

  it('should be defined', () => {
    expect(productService).toBeDefined();
  });

  it('should call getAll method of entity', async () => {
    jest.spyOn(Products, 'find').mockResolvedValueOnce({} as any);

    await productService.getAll();

    expect(Products.find).toHaveBeenCalledTimes(1);
  });

  it('should call create method of entity', async () => {
    const mockProduct = createMock<ProductsDTO>();

    jest.spyOn(Products, 'create').mockReturnValueOnce({} as any);

    jest.spyOn(Products, 'save').mockResolvedValueOnce({} as any);

    await productService.create(mockProduct);

    expect(Products.create).toHaveBeenCalledTimes(1);
    expect(Products.save).toHaveBeenCalledTimes(1);
  });

  it('should call update method of entity', async () => {
    const mockProduct = createMock<ProductsDTO>();

    jest.spyOn(Products, 'merge').mockReturnValueOnce({} as any);

    jest.spyOn(Products, 'findOne').mockResolvedValueOnce({} as any);

    jest.spyOn(Products, 'save').mockResolvedValueOnce({} as any);

    await productService.update('fake_id', mockProduct);

    expect(Products.findOne).toHaveBeenCalledTimes(1);
    expect(Products.merge).toHaveBeenCalledTimes(1);
    expect(Products.save).toHaveBeenCalledTimes(1);
  });

  it('should call delete method of entity', async () => {
    jest.spyOn(Products, 'findOne').mockResolvedValueOnce({} as any);

    jest.spyOn(Products, 'softRemove').mockResolvedValueOnce({} as any);

    await productService.delete('fake_id');

    expect(Products.findOne).toHaveBeenCalledTimes(1);
    expect(Products.softRemove).toHaveBeenCalledTimes(1);
  });
});
