import { Inventory } from './../../../../models/item';
import { createAction, props } from '@ngrx/store';

export const loadInventorys = createAction(
  '[Inventory] Load Inventorys'
);

export const loadInventorysSuccess = createAction(
  '[Inventory] Load Inventorys Success',
  props<{ data: Inventory[] }>()
);

export const loadInventorysFailure = createAction(
  '[Inventory] Load Inventorys Failure',
  props<{ error: any }>()
);
