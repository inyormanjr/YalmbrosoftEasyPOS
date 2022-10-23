import { userManagementFeatureKey, UserManagementState } from './../reducers/index';
import { createFeatureSelector, createSelector } from '@ngrx/store';

 const selectUserManagementFeature = createFeatureSelector<UserManagementState>(
   userManagementFeatureKey
 );

 export const selectUsers = createSelector(
   selectUserManagementFeature,
   (x) => x.users
 );
