import { User } from 'src/app/models/user';
import { AdminModel } from './../stateModels/admin.model';
import { createAction, props } from '@ngrx/store';

export const loadAdmins = createAction(
  '[Admin] Load Admins'
);

export const loadAdminsSuccess = createAction(
  '[Admin] Load Admins Success',
  props<{ data: AdminModel }>()
);

export const loadUserProfile = createAction('[Admin] Fetch User Profile');

export const loadUserProfileSuccess = createAction(
  '[Admin] Fetch User Profile Success',
  props<{ data: User }>()
);

export const loadAdminsFailure = createAction(
  '[Admin] Load Admins Failure',
  props<{ error: any }>()
);
