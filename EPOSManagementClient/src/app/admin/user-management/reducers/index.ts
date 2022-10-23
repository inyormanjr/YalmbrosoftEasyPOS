import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on
} from '@ngrx/store';
import { User } from 'src/app/models/user';
import { UserManagementActionTypes } from '../actions/user-management.action.types';

export const userManagementFeatureKey = 'user-management';

export interface UserManagementState {
    users: User[]
}

export const userManagementInitialState: UserManagementState = {
  users: []
}

export const reducers = createReducer(userManagementInitialState,
  on(UserManagementActionTypes.loadUsersSuccess, (state, action) => {
    return {
      ...state,
      users: action.data
    }
}));


