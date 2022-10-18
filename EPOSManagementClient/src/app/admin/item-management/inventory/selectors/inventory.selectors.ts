import { inventoryFeatureKey, InventoryState } from './../reducers/index';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const selectProductFeature =
  createFeatureSelector<InventoryState>(inventoryFeatureKey);

export const selectInventories = createSelector(
  selectProductFeature,
  (x) => x.inventories
);
