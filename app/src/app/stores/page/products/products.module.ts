import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ProductPageEffects } from './products.effect';
import { productReducer } from './products.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('product-page-store', productReducer),
    EffectsModule.forFeature([ProductPageEffects]),
  ],
})
export class ProductPageStoreModule {}