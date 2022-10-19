import { loadStockMovementSuccess } from './../actions/inventory.actions';
import { Inventory, InventoryTransaction } from './../../../../models/item';
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
  inventories: Inventory[],
  inventoryTransactions: InventoryTransaction[],
}

export const inventoryInitialState: InventoryState = {
  inventories: [],
  inventoryTransactions: []
};

export const reducers = createReducer(inventoryInitialState,
  on(InventoryActionTypes.loadInventorysSuccess, (state, action) => {
    return {
      ...state,
      inventories: action.data
   }
  }),
  on(InventoryActionTypes.loadStockMovementSuccess, (state, action) => {
    return {
      ...state,
      inventoryTransactions: action.data
  }
  }),
);

