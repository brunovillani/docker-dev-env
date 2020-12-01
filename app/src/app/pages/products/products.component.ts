import { Component, OnInit } from '@angular/core';
import { Product } from '@app/models';
import { ProductPageActions } from '@app/stores/page/products/products.action';
import { ProductPageSelectors } from '@app/stores/page/products/products.selector';
import { ProductPageState } from '@app/stores/page/products/products.state';
import { RootState } from '@app/stores/root-store.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products$: Observable<Product[]>;
  
  constructor(private store: Store<ProductPageState>) { }

  ngOnInit(): void {
    this.store.dispatch(ProductPageActions.requestProduct());
    this.products$ = this.store.select(ProductPageSelectors.selectProducts);
  }

}
