import { ManageChangePasswordModalComponent } from './../../components/manage-change-password-modal/manage-change-password-modal.component';
import { ManagePhoneModalComponent } from './../../components/manage-phone-modal/manage-phone-modal.component';
import { ManageEmailModalComponent } from './../../components/manage-email-modal/manage-email-modal.component';
import { ManageGenderModalComponent } from './../../components/manage-gender-modal/manage-gender-modal.component';
import { ManageAddressModalComponent } from './../../components/manage-address-modal/manage-address-modal.component';
import { ManageNameModalComponent } from './../../components/manage-name-modal/manage-name-modal.component';
import { Observable } from 'rxjs';
import { ManagePhotoModalComponent } from './../../components/manage-photo-modal/manage-photo-modal.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';
import { AdminModel } from 'src/app/admin/stateModels/admin.model';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user';
import { AdminActionTypes } from 'src/app/admin/actions/admin.action.types';
import { adminSelectorTypes } from 'src/app/admin/selectors/admin.selector.types';
import { _profilePhotoBaseURL } from 'src/app/constant_var';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  bsModalRef?: BsModalRef;
  currentUserProfile$: Observable<User | undefined> | undefined;
  ppBaseURL = _profilePhotoBaseURL;
  constructor(
    private bsModalService: BsModalService,
    private adminStore: Store<AdminModel>
  ) {
    this.currentUserProfile$ = this.adminStore.select(
      adminSelectorTypes.selectCurrentUserProfile
    );
  }

  ngOnInit(): void {}

  showManagePhotoModal() {
    this.bsModalRef = this.bsModalService.show(ManagePhotoModalComponent, {
      class: 'modal-md',
    });
  }

  showManageNameModal() {
    this.bsModalRef = this.bsModalService.show(ManageNameModalComponent, {
      class: 'modal-md',
    });
  }

  showManageAddressModal() {
    this.bsModalRef = this.bsModalService.show(ManageAddressModalComponent, {
      class: 'modal-md',
    });
  }

  showManageGenderModal() {
    this.bsModalRef = this.bsModalService.show(ManageGenderModalComponent, {
      class: 'modal-md',
    });
  }

  showManageEmailModal() {
    this.bsModalRef = this.bsModalService.show(ManageEmailModalComponent, {
      class: 'modal-md',
    });
  }

  showManagePhoneModal() {
    this.bsModalRef = this.bsModalService.show(ManagePhoneModalComponent, {
      class: 'modal-md',
    });
  }

  showManageChangePasswordModal() {
    this.bsModalRef = this.bsModalService.show(ManageChangePasswordModalComponent, {
      class: 'modal-md',
    });
  }
}
