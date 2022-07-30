import { Module } from '@nestjs/common';
import { ProductController } from './modules/products/controller/product.controller';
import { ProductService } from './modules/products/service/product.service';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [ProductService],
})
export class AppModule {}
