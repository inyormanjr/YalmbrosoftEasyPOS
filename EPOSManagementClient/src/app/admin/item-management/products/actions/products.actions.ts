import { createAction, props } from '@ngrx/store';
import { Supplier } from 'src/app/models/supplier';

export const loadProductss = createAction(
  '[Products] Load Productss'
);

export const loadSuppliers = createAction('[Products] Load Suppliers'
);

export const loadSupplierSuccess = createAction('[Products] Load Suppliers', props<{data: Supplier[]}>());

export const loadProductssSuccess = createAction(
  '[Products] Load Productss Success',
  props<{ data: any }>()
);

export const loadProductssFailure = createAction(
  '[Products] Load Productss Failure',
  props<{ error: any }>()
);
