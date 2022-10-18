import { Inventory } from './../../../../models/item';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on
} from '@ngrx/store';
import { InventoryActionTypes } from '../actions/inventory.action.types';

export const inventoryFeatureKey = 'inventory';

export interface InventoryState {
  inventories: Inventory []
}

export const inventoryInitialState: InventoryState = {
  inventories: []
};

export const reducers = createReducer(inventoryInitialState,
  on(InventoryActionTypes.loadInventorysSuccess, (state, action) => {
    return {
      ...state,
      inventories: action.data
   }
 })
);

