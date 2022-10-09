import { loadAdminsSuccess } from './../actions/admin.actions';

import { AdminModel } from './../stateModels/admin.model';
import {
  createReducer,
  on
} from '@ngrx/store';
import { loadAdmins } from '../actions/admin.actions';

export const adminFeatureKey = 'admin';


export const adminInitialState: AdminModel = {
  isLoading: false,
  currentUser: 'jryap20@gmail.com',
  companyName: 'Company One'
};

export const adminReducer = createReducer(
  adminInitialState,
  on(loadAdmins, (state, action) => {
    return {
      ...state,
      isLoading: true
    }
  }),
  on(loadAdminsSuccess, (state, action) => {
    return {
      ...state,
      currentUser: action.data.currentUser,
      companyName: action.data.companyName
    }
  })
);



