import { Product } from '@app/models';
import { createAction, props } from '@ngrx/store';

export namespace ProductPageActions {
  enum ProductPageActionsEnum {
    RequestProducts = '[ProductPage] Request Products',
    RequestProductsSuccess = '[ProductPage] Request Products Success',
    RequestProductsFail = '[ProductPage] Request Products Fail',
  }

  export const requestProduct = createAction(
    ProductPageActionsEnum.RequestProducts
  );

  export const requestProductSuccess = createAction(
    ProductPageActionsEnum.RequestProductsSuccess,
    props<{ products: Product[] }>()
  );
}
