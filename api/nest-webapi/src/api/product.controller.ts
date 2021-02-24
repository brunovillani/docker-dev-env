import { Controller, Get, Post, Param } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Product } from 'src/models';
import { ProductService } from '../service/product.service';

@Controller('/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getProducts(): Observable<Product[]> {
    return this.productService.getProducts();
  }

  @Get(':name')
  getProduct(@Param('name') name): Observable<Product> {
    return this.productService.getProduct({ name });
  }

  @Post('add/:product')
  addProduct(@Param('product') product: string) {
    return this.productService.addProduct(<Product>{ name: product });
  }

  @Post('remove/:product')
  removeProduct(@Param('product') product: string) {
    return this.productService.removeProduct(product);
  }
}
