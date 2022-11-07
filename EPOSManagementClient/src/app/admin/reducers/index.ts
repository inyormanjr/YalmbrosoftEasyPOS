import { loadUserManagements } from './../user-management/actions/user-management.actions';
import { User } from 'src/app/models/user';
import { loadAdminsSuccess, loadUserProfileSuccess } from './../actions/admin.actions';

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
  companyName: 'Company One',
  userProfile: undefined,
};

export const adminReducer = createReducer(
  adminInitialState,
  on(loadUserProfileSuccess, (state, action) => {
    return {
      ...state,
      userProfile: action.data
    }
  }),
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
      companyName: action.data.companyName,
      userProfile: action.data.userProfile
    }
  })
);



