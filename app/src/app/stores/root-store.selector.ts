import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RootState } from './root-store.state';

export namespace RootStoreSelectors {
  const getRootSelector = createFeatureSelector<RootState>('root-store');

  export const getError = createSelector(
    getRootSelector,
    (state) => state.error
  );
}
