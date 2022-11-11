import { AuthService } from 'src/app/login/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AdminModel } from 'src/app/admin/stateModels/admin.model';
import Validation from 'src/app/shared/utils/confirm-password-validation';

@Component({
  selector: 'app-manage-change-password-modal',
  templateUrl: './manage-change-password-modal.component.html',
  styleUrls: ['./manage-change-password-modal.component.css'],
})
export class ManageChangePasswordModalComponent implements OnInit {
  changePasswordForm: FormGroup;
  constructor(
    private authService: AuthService,
    private adminStore: Store<AdminModel>,
    public bsModalRef: BsModalRef,
    private toastR: ToastrService,
    private fB: FormBuilder
  ) {
    this.changePasswordForm = fB.group(
      {
        currentPassword: ['', [Validators.required]],
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmNewPassword: [
          '',
          [Validators.required, Validators.minLength(6)],
        ],
      },
      {
        validators: [Validation.mustMatch('newPassword', 'confirmNewPassword')],
      }
    );
  }

  get f (){return this.changePasswordForm.controls}


  ngOnInit(): void {}

  save() {
    console.log(this.changePasswordForm.value);
    this.authService.changePassword(this.changePasswordForm.value).subscribe(((x: any) => {
      this.toastR.success('Password changed successfully');
      this.bsModalRef.hide();
    }), err => this.toastR.error(err.error));
  }
}
