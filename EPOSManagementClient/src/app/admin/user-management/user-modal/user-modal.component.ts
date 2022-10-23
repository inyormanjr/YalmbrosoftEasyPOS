import { UserManagementState } from './../reducers/index';
import { UsersService } from './../../services/user/users.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { UserManagementActionTypes } from '../actions/user-management.action.types';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css'],
})
export class UserModalComponent implements OnInit {
  registerForm: FormGroup;
  initialItem: any | undefined;
  isLoading = false;
  constructor(
    private fB: FormBuilder,
    private userService: UsersService,
    private toastr: ToastrService,
    private userManagementStore: Store<UserManagementState>
  ) {
    this.registerForm = fB.group({
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

  }

  ngOnInit(): void {
    console.log(this.initialItem);
    this.registerForm.patchValue(this.initialItem);
  }

  saveUser() {
    const user = Object.assign({}, this.registerForm.value);
    this.isLoading = true;
    if(user._id == undefined)
    this.userService.Create(user).subscribe(
      (x: any) => {
        this.isLoading = false;
        this.registerForm.reset();
        this.userManagementStore.dispatch(UserManagementActionTypes.loadUsers());
        this.toastr.success('Successfully created User')
      },
      (err) => {
        this.isLoading = false;
        this.toastr.error(err.error);
      }
    );
    else
      this.userService.Update(user._id, user).subscribe(
        (x: any) => {
          this.isLoading = false;
          this.userManagementStore.dispatch(
            UserManagementActionTypes.loadUsers()
          );
          this.toastr.success('Successfully Updated User');
        },
        (err) => {
          this.isLoading = false;
          this.toastr.error(err.error);
        }
      );
  }
}
