import { User } from 'src/app/models/user';
import { slideInAnimation } from './../../animation';

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AdminActionTypes } from '../actions/admin.action.types';
import { AdminModel } from '../stateModels/admin.model';
import { _username, _company, _userObj } from 'src/app/constant_var';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css'],
  animations: [slideInAnimation]
})
export class AdminViewComponent implements OnInit {

  companyName = 'Company Name';
  constructor(private adminStore: Store<AdminModel>) { }

  ngOnInit(): void {

    const currentUser = localStorage.getItem(_username);
    const company = localStorage.getItem(_company);
    const obj = localStorage.getItem(_userObj);


    if (currentUser && company && obj) {
      const currentUserProfile = JSON.parse(obj);
      this.adminStore.dispatch(
        AdminActionTypes.loadAdminsSuccess({
          data: {
            isLoading: false,
            currentUser: currentUser,
            companyName: company,
            userProfile: currentUserProfile as User
          },
        })
      );
    }
  }

}
