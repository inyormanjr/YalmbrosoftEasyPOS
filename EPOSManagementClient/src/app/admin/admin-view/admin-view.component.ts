import { slideInAnimation } from './../../animation';

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AdminActionTypes } from '../actions/admin.action.types';
import { AdminModel } from '../stateModels/admin.model';

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

    const currentUser = localStorage.getItem('username');
    const company = localStorage.getItem('company');
    if (currentUser && company)
      this.adminStore.dispatch(
        AdminActionTypes.loadAdminsSuccess({
          data: {
            isLoading: false,
            currentUser: currentUser,
            companyName: company
          },
        })
      );
  }

}
