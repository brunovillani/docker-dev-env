import { createFeatureSelector } from '@ngrx/store';
import { productPageAdapter, ProductPageState } from './products.state';

export namespace ProductPageSelectors {
  const getProductPageSelector = createFeatureSelector<ProductPageState>('product-page-store');

  const {
      selectIds,
      selectEntities,
      selectAll,
      selectTotal
  } = productPageAdapter.getSelectors();

  export const selectProducts = selectAll;
}
