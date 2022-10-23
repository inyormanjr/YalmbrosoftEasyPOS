import { UserModalComponent } from './../user-modal/user-modal.component';
import { Observable } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserManagementActionTypes } from '../actions/user-management.action.types';
import { UserManagementState } from '../reducers';
import { User } from 'src/app/models/user';
import { UserManagementSelectorTypes } from '../selectors/user-management.selector.types';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-user-management-view',
  templateUrl: './user-management-view.component.html',
  styleUrls: ['./user-management-view.component.css'],
})
export class UserManagementViewComponent implements OnInit {
  users$: Observable<User[]> | undefined;
  bsModalRef?: BsModalRef;
  constructor(
    private userManagementStore: Store<UserManagementState>,
    private modalService: BsModalService
  ) {
    userManagementStore.dispatch(UserManagementActionTypes.loadUsers());
  }

  showUserModal(user?: any) {
     const initialState: ModalOptions = {
       initialState: {
         initialItem: user,
       },
       class: 'modal-lg',
     };
     this.bsModalRef = this.modalService.show(UserModalComponent, initialState);
  }

  ngOnInit(): void {
    this.users$ = this.userManagementStore.select(
      UserManagementSelectorTypes.selectUsers
    );
  }
}
