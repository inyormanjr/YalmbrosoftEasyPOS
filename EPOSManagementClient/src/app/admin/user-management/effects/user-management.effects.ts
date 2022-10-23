import { UsersService } from './../../services/user/users.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserManagementState } from '../reducers';
import { Store } from '@ngrx/store';
import { UserManagementActionTypes } from '../actions/user-management.action.types';
import { tap, map } from 'rxjs/operators';
import { noop } from 'rxjs';



@Injectable()
export class UserManagementEffects {

  fetchUsers$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserManagementActionTypes.loadUsers),
        tap((action) => {
          this.userService.Get().pipe(map((data: any) => {
                this.userStore.dispatch(UserManagementActionTypes.loadUsersSuccess({data: data.data}))
              })).subscribe(noop, (error) => {console.log(error)})
        })
      ),
    {dispatch: false}
  );


  constructor(private actions$: Actions, private userService: UsersService,private userStore: Store<UserManagementState>) {}

}
