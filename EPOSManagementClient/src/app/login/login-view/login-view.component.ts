import { ModalMessageComponent } from '../../shared/components/modal-message/modal-message.component';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
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
      username: [''],
      password: [''],
    });
  }

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
          localStorage.setItem('token', x.token);
          localStorage.setItem('username', x.data.username);
          localStorage.setItem('company', x.data.companyName);
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
