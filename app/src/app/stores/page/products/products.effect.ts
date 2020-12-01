import { Injectable } from '@angular/core';
import { ProductService } from '@app/services/product.service';
import { RootActions } from '@app/stores/root-store.action';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { ProductPageActions } from './products.action';

@Injectable()
export class ProductPageEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductPageActions.requestProduct),
      exhaustMap(() =>
        this.productService.loadProducts().pipe(
            map((products) =>
              ProductPageActions.requestProductSuccess({ products })
            ),
            catchError((error) => of(RootActions.setError({ error })))
        )
      )
    )
  );
}
