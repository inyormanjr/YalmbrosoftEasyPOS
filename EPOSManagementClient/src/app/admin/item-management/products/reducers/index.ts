import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer
} from '@ngrx/store';

export const productsFeatureKey = 'products';

export interface ProductsState {
  suppliers: []
}

export const productsInitialState: ProductsState = {
  suppliers: []
};

export const productReducer = createReducer(
  productsInitialState,
);


