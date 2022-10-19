import { Inventory, InventoryTransaction } from './../../../../models/item';
import { createAction, props } from '@ngrx/store';

export const loadInventorys = createAction(
  '[Inventory] Load Inventorys'
);

export const loadStockMovement = createAction('[Inventory] Load Stockmovement', props < {page?: any}>());

export const loadStockMovementSuccess = createAction(
  '[Inventory] Load Inventorys Success',
  props<{ data: InventoryTransaction[] }>()
);
export const loadInventorysSuccess = createAction(
  '[Inventory] Load Inventorys Success',
  props<{ data: Inventory[] }>()
);

export const loadInventorysFailure = createAction(
  '[Inventory] Load Inventorys Failure',
  props<{ error: any }>()
);
