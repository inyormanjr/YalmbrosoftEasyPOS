import { PosTransaction } from './../../models/pos-transaction';
import { Category } from 'src/app/models/category';
import { Inventory } from './../../models/item';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on
} from '@ngrx/store';
import { PosActionTypes } from '../actions/pos-actions.types';

export const posStoreFeatureKey = 'posStore';

export interface PosState {
  isFetchingProduct: boolean,
  isLoading: boolean,
  categories: Category[],
  productList: Inventory[],
  currentPosTrans?: PosTransaction,
}

export const posInitialState: PosState = {
  isFetchingProduct: false,
  isLoading: false,
  categories: [],
  productList: [],
  currentPosTrans: undefined
};

export const reducers = createReducer(
  posInitialState,
  on(PosActionTypes.loadPosProducts, (state, action) => {
    return {
      ...state,
      isLoading: false,
      isFetchingProduct: true,
    };
  }),
  on(PosActionTypes.loadPosActionssSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
    };
  }),
  on(PosActionTypes.loadPosCategoriesSuccess, (state, action) => {
    return {
      ...state,
      categories: action.data,
    };
  }),
  on(PosActionTypes.loadPosProductsSuccess, (state, action) => {
    return {
      ...state,
      productList: action.data,
      isFetchingProduct: false
    };
  })
);

