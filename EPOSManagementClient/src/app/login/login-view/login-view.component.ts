import { ModalMessageComponent } from '../../shared/components/modal-message/modal-message.component';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { _company, _role, _token, _username, _userObj } from 'src/app/constant_var';
@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.css'],
})
export class LoginViewComponent implements OnInit {
  loginForm: FormGroup;
  bsModalRef?: BsModalRef;
  isLoading = false;
  constructor(
    private authService: AuthService,
    private fB: FormBuilder,
    private router: Router,
    private modalService: BsModalService
  ) {
    this.loginForm = fB.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  get f() { return this.loginForm.controls };

  openModalMessage(message: string) {
    const initialState: ModalOptions = {
      initialState: {
        message: message,
        title: 'Login Failed',
      },
    };
    this.bsModalRef = this.modalService.show(
      ModalMessageComponent,
      initialState,
    );
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  ngOnInit(): void {}

  login() {
    const credentials = Object.assign({}, this.loginForm.value);
    this.isLoading = true;
    this.authService
      .login(credentials.username, credentials.password)
      .subscribe(
        (x) => {
          localStorage.setItem(_token, x.token);
          localStorage.setItem(_username, x.data.username);
          localStorage.setItem(_role, x.data.userType);
          localStorage.setItem(_company, x.data.companyId.companyName);
          localStorage.setItem(_userObj, JSON.stringify(x.data));
          this.router.navigateByUrl('/admin');
          this.isLoading = false;
        },
        (error) => {
          this.openModalMessage(error.error.error);
          this.isLoading = false;
        }
      );
  }
}
