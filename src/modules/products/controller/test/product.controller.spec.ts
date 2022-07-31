import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../../service/product.service';
import { ProductController } from '../product.controller';
import { createMock } from '@golevelup/ts-jest';
import { ProductsDTO } from '../../dto/create-products.dto';

describe('ProductController', () => {
  let productController: ProductController;
  let productService: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: {
            getAll: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    productController = module.get<ProductController>(ProductController);
    productService = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(productController).toBeDefined();
    expect(productService).toBeDefined();
  });

  it('should call getAll method of service', async () => {
    await productController.getAll();

    expect(productService.getAll).toHaveBeenCalledTimes(1);
  });

  it('should call create method of service', async () => {
    const productMock = createMock<ProductsDTO>();
    await productController.create(productMock);

    expect(productService.create).toHaveBeenCalledTimes(1);
  });

  it('should call update method of service', async () => {
    const productMock = createMock<ProductsDTO>();
    await productController.update('fake_id', productMock);

    expect(productService.update).toHaveBeenCalledTimes(1);
  });

  it('should call delete method of service', async () => {
    await productController.delete('fake_id');

    expect(productService.delete).toHaveBeenCalledTimes(1);
  });
});
