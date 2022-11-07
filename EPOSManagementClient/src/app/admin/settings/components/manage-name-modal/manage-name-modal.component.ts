import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { adminSelectorTypes } from 'src/app/admin/selectors/admin.selector.types';
import { Store } from '@ngrx/store';
import { FormGroup } from '@angular/forms';
import { UsersService } from './../../../services/user/users.service';
import { Component, OnInit } from '@angular/core';
import { AdminModel } from 'src/app/admin/stateModels/admin.model';

@Component({
  selector: 'app-manage-name-modal',
  templateUrl: './manage-name-modal.component.html',
  styleUrls: ['./manage-name-modal.component.css']
})
export class ManageNameModalComponent implements OnInit {
  userForm: FormGroup;
  constructor(private userService: UsersService,
    private adminStore: Store<AdminModel>,
    public bsModalRef: BsModalRef,
    private toastR: ToastrService) {

    this.userForm = userService.createUserFromGroup();
    adminStore.select(adminSelectorTypes.selectCurrentUserProfile)
      .subscribe(x => {
        if(x)
        this.userForm.patchValue(x);
    });
  }
  ngOnInit(): void {
  }

  save() {
    this.userService.Update(this.userForm.value._id, this.userForm.value)
      .subscribe(((x: any) => {
          this.userService.updateCurrentUserProfileLocal(x.data);
          this.toastR.success('Updated Successful');
      }),err => {console.log(err)});
  }

}
