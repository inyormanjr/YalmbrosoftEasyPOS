import { createAction, props } from '@ngrx/store';
import { Item } from 'src/app/models/item';
import { Supplier } from 'src/app/models/supplier';

export const loadProductss = createAction(
  '[Products] Load Productss'
);

export const loadSuppliers = createAction('[Products] Load Suppliers'
);

export const loadSupplierSuccess = createAction('[Products] Load Suppliers', props<{data: Supplier[]}>());

export const loadProductsSuccess = createAction(
  '[Products] Load Productss Success',
  props<{ data: Item[] }>()
);

export const loadProductsFailure = createAction(
  '[Products] Load Productss Failure',
  props<{ error: any }>()
);
