import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ProductPageStoreModule } from './page/products/products.module';
import { rootReducer } from './root-store.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot({root: rootReducer}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 15,
    }),
    ProductPageStoreModule
  ],
  declarations: []
})
export class RootStoreModule {}