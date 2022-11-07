import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { adminSelectorTypes } from 'src/app/admin/selectors/admin.selector.types';
import { UsersService } from 'src/app/admin/services/user/users.service';
import { AdminModel } from 'src/app/admin/stateModels/admin.model';

@Component({
  selector: 'app-manage-phone-modal',
  templateUrl: './manage-phone-modal.component.html',
  styleUrls: ['./manage-phone-modal.component.css'],
})
export class ManagePhoneModalComponent implements OnInit {
  userForm: FormGroup;
  constructor(
    private userService: UsersService,
    private adminStore: Store<AdminModel>,
    public bsModalRef: BsModalRef,
    private toastR: ToastrService
  ) {
    this.userForm = userService.createUserFromGroup();
    adminStore
      .select(adminSelectorTypes.selectCurrentUserProfile)
      .subscribe((x) => {
        if (x) this.userForm.patchValue(x);
      });
  }
  ngOnInit(): void {}

  save() {
    this.userService
      .Update(this.userForm.value._id, this.userForm.value)
      .subscribe(
        (x: any) => {
          this.userService.updateCurrentUserProfileLocal(x.data);
          this.toastR.success('Updated Successful');
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
