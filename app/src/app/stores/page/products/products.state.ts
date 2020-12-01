import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Product } from '@app/models';

export interface ProductPageState extends EntityState<Product>{}

export const productPageAdapter: EntityAdapter<Product> = createEntityAdapter<Product>({})

export const productPageInitialState: ProductPageState = productPageAdapter.getInitialState({});
