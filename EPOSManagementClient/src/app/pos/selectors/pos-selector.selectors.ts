import { PosState, posStoreFeatureKey } from './../reducers/index';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const selectPoFeature = createFeatureSelector<PosState>(posStoreFeatureKey);

export const selectIsFetchingProduct = createSelector(
  selectPoFeature,
  (x) => x.isFetchingProduct
);

export const selectPosIsLoading = createSelector(
  selectPoFeature,
  (x) => x.isLoading
);

export const selectCategories = createSelector(selectPoFeature, (x) => x.categories);

export const selectProducts = createSelector(selectPoFeature, (x) => x.productList);
