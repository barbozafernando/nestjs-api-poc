import configuration from '../src/config/configuration';
import { TypeOrmConfigService } from '../src/modules/database/services/typeorm-config.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './modules/products/controller/product.controller';
import { ProductService } from './modules/products/service/product.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class AppModule {}
