import { Injectable } from '@nestjs/common';
import { ProductsDTO } from '../dto/create-products.dto';
import { Products } from '../entity/product.entity';

@Injectable()
export class ProductService {
  async getAll() {
    return Products.find();
  }

  async create(product: ProductsDTO) {
    const productEntity = Products.create(product as Products);

    return Products.save(productEntity);
  }

  async update(id: string, product: ProductsDTO) {
    const condition = {
      where: { id },
    };
    const existingProduct = await Products.findOne(condition);

    if (!existingProduct) {
      /* istanbul ignore next */
      return JSON.stringify({ error: `Product with id ${id} does not exist.` });
    }

    const mergedProduct = Products.merge(existingProduct, product as Products);

    return Products.save(mergedProduct);
  }

  async delete(id: string) {
    const condition = {
      where: { id },
    };
    const existingProduct = await Products.findOne(condition);

    if (!existingProduct) {
      /* istanbul ignore next */
      return JSON.stringify({ error: `Product with id ${id} does not exist.` });
    }

    return Products.softRemove(existingProduct);
  }
}
