import { Action, createReducer, on } from '@ngrx/store';
import { ProductPageActions } from './products.action';
import { productPageInitialState, ProductPageState } from './products.state';

const _productReducer = createReducer(
  productPageInitialState,
  on(ProductPageActions.requestProduct, (state) => {
    return {
      ...state,
    };
  })
);

export const productReducer = (state: ProductPageState, action: Action) =>
  _productReducer(state, action);
