import { AdminActionTypes } from 'src/app/admin/actions/admin.action.types';
import { AdminModel } from 'src/app/admin/stateModels/admin.model';
import { Store } from '@ngrx/store';
import { _userObj } from 'src/app/constant_var';
import { FormGroup, FormBuilder } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/login/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './../../../shared/base/service/base.service';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseService<User> {
   serviceRoute = 'users';
  constructor(public httpClient: HttpClient,
    public authService: AuthService,
    private fB: FormBuilder,
    private adminStore: Store<AdminModel>) {
    super(httpClient, authService);
    this.baseURL += this.serviceRoute;
  }

  uploadPhoto(file: any): Observable<any>{
    let formData: FormData = new FormData();
    formData.append('file', file);
    return this.httpClient
      .post(this.baseURL + '/photo', formData)
      .pipe(map((x: any) => x.data));
  }

  createUserFromGroup(user?: User): FormGroup {
    const userForm = this.fB.group({
      _id: [],
      companyName: [''],
      companyId: [''],
      firstName: [''],
      middleName: [''],
      lastName: [''],
      address: [''],
      mobileNumber: [''],
      gender: ['Male'],
      username: [''],
      password: [''],
      userType: ['Cashier'],
    });
    if (user)
      userForm.patchValue(user);
  return userForm;
  }

  updateCurrentUserProfileLocal(user: User) {
    console.log(user);
    const stringifydUser = JSON.stringify(user);
    localStorage.setItem(_userObj, stringifydUser);
    this.adminStore.dispatch(AdminActionTypes.loadUserProfileSuccess({ data: user }));
  }
}
