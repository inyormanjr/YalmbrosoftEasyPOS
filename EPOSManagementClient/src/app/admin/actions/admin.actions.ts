import { AdminModel } from './../stateModels/admin.model';
import { createAction, props } from '@ngrx/store';

export const loadAdmins = createAction(
  '[Admin] Load Admins'
);

export const loadAdminsSuccess = createAction(
  '[Admin] Load Admins Success',
  props<{ data: AdminModel }>()
);

export const loadAdminsFailure = createAction(
  '[Admin] Load Admins Failure',
  props<{ error: any }>()
);
