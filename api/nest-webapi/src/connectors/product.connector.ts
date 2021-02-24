import { Injectable } from '@nestjs/common';
import { FilterQuery } from 'mongodb';
import { Product } from 'src/models';
import { DbBase } from './db-base.connector';

@Injectable()
export class ProductConnector extends DbBase {
  constructor() {
    super('products');
  }

  public findOneProduct(filter: FilterQuery<Product>) {
    return this.findOne(filter);
  }

  public findManyProducts(filter: FilterQuery<Product>) {
    return this.findMany(filter);
  }

  public addProduct(product) {
    return this.addOne(product);
  }

  public removeProduct(filter) {
    return this.removeOne(filter);
  }
}
