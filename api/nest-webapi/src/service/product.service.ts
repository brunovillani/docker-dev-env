import { Injectable } from '@nestjs/common';
import { ProductConnector } from 'src/connectors/product.connector';
import { Product } from 'src/models';

@Injectable()
export class ProductService {

  constructor(private productsConnector: ProductConnector) { }

  getProducts(filter = null) {
    return this.productsConnector.findManyProducts(filter);
  }

  getProduct(filter) {
    return this.productsConnector.findOneProduct(filter);
  }

  addProduct(product: Product) {
    return this.productsConnector.addProduct(product);
  }

  removeProduct(name: string) {
    return this.productsConnector.removeProduct({ name })
  }
}
