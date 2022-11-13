import { Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { AuthService } from './../../login/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ModalMessageComponent } from 'src/app/shared/components/modal-message/modal-message.component';
import Validation from 'src/app/shared/utils/custom-validations';
import { companyNameValidator } from 'src/app/shared/utils/company-name.validator';

@Component({
  selector: 'app-register-view',
  templateUrl: './register-view.component.html',
  styleUrls: ['./register-view.component.css'],
})
export class RegisterViewComponent implements OnInit {
  registerForm: FormGroup;
  bsModalRef?: BsModalRef;
  isLoading = false;
  constructor(
    private authService: AuthService,
    private fB: FormBuilder,
    private modalService: BsModalService,
    private router: Router
  ) {

    this.registerForm = fB.group(
      {
        companyName: [
          '',
          {
            validators: [Validators.required, Validators.minLength(5)],
            asyncValidators: [companyNameValidator(this.authService)],
            updateOn: 'blur',
          },
        ],
        companyId: [''],
        firstName: ['', Validators.required],
        middleName: ['', Validators.required],
        lastName: ['', Validators.required],
        gender: [null],
        address: [''],
        mobileNumber: [''],
        username: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(5)]],
        confirmPassword: ['', Validators.required],
        userType: ['Owner'],
      },
      {
        validators: [
          Validation.mustMatch('password', 'confirmPassword'),
          Validation.mustNotEmptyString([
            'firstName',
            'middleName',
            'lastName',
          ]),
        ],
      }
    );
  }

  get f() { return this.registerForm.controls };


  openModalMessage(title: string, message: string) {
    const initialState: ModalOptions = {
      initialState: {
        message: message,
        title: title,
      },
    };
     this.bsModalRef = this.modalService.show(
       ModalMessageComponent,
       initialState
     );
     this.bsModalRef.content.closeBtnName = 'Close';

  }



  ngOnInit(): void {}

  register() {
    const user = Object.assign({}, this.registerForm.value);
    this.isLoading = true;
    this.authService.register(user).subscribe(
      (x) => {
        this.isLoading = false;
        this.router.navigate(['registration-complete']);
      },
      (error) => {
        this.openModalMessage('Registration Failed',error.error.error);
        this.isLoading = false;
      }
    );
  }
}
