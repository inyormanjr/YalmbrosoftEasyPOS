import { createAction, props } from '@ngrx/store';

export const loadUserManagements = createAction(
  '[UserManagement] Load UserManagements'
);

export const loadUsers = createAction(
  '[UserManagement] Load Users'
);

export const loadUsersSuccess = createAction(
  '[UserManagement] Load Users Success',
  props<{ data: any }>()
);

export const loadUserManagementsSuccess = createAction(
  '[UserManagement] Load UserManagements Success',
  props<{ data: any }>()
);

export const loadUserManagementsFailure = createAction(
  '[UserManagement] Load UserManagements Failure',
  props<{ error: any }>()
);
