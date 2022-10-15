import { ProductsState, productsFeatureKey } from './../reducers/index';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const selectProductFeature = createFeatureSelector<ProductsState>(productsFeatureKey);

export const selectSuppliers = createSelector(selectProductFeature, (x) => x.suppliers);

export const selectItems = createSelector(selectProductFeature, x => x.items);
