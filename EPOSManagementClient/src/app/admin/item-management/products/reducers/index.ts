import { Item } from 'src/app/models/item';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on
} from '@ngrx/store';
import { ProductActionTypes } from '../actions/products.action.types';

export const productsFeatureKey = 'products';

export interface ProductsState {
  suppliers: [],
  items: Item[]
}

export const productsInitialState: ProductsState = {
  suppliers: [],
  items: []
};

export const productReducer = createReducer(
  productsInitialState,
  on(ProductActionTypes.loadProductsSuccess, (state, action) => {
    return {
      ...state,
      items: action.data
    }
  })
);


