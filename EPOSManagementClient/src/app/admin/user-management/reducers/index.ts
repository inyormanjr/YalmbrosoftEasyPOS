import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { User } from 'src/app/models/user';

export const userManagementFeatureKey = 'user-management';

export interface UserManagementState {
    users: User[]
}

export const userManagementInitialState: UserManagementState = {
  users: []
}

export const reducers = createReducer(userManagementInitialState);


