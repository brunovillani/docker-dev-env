import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '@app/models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseHttpService } from './http-base.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends BaseHttpService {
  constructor(http: HttpClient) {
    super(http, 'product');
  }

  public loadProducts(): Observable<Product[]> {
      return this.get<Product[]>(['products']).pipe(
          map(prod => {
            return prod ? prod.map((p: any) => (<Product>{name: p, description: p})) : null;
          })
      );
  }
}
