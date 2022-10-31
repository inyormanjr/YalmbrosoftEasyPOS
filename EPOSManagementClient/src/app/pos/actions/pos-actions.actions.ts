import { createAction, props } from '@ngrx/store';

export const loadPosActionss = createAction(
  '[PosActions] Load PosActionss'
);

export const loadPosActionssSuccess = createAction(
  '[PosActions] Load PosActionss Success',
  props<{ data: any }>()
);

export const loadPosActionssFailure = createAction(
  '[PosActions] Load PosActionss Failure',
  props<{ error: any }>()
);

export const loadPosConfig = createAction('[PosActions] Load PosConfig');

export const loadPosConfigSuccess = createAction(
  '[PosActions] Load PosConfig Successful',
  props<{ data: any }>()
);

export const loadPosCategories= createAction(
  '[PosActions] Load Categories'
);



export const loadPosCategoriesSuccess = createAction(
  '[PosActions] Load Categories Successful',
  props<{ data: any }>()
);


export const loadPosProducts = createAction(
  '[PosActions] Load Products',
  props<{ data?: any }>()
);

export const loadPosProductsSuccess = createAction(
  '[PosActions] Load Products Successful',
  props<{ data: any }>()
);

