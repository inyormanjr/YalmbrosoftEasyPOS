import { NgxModule } from './../shared/ngx-bootstrap/ngx/ngx.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginViewComponent } from './login-view/login-view.component';
import { ModalMessageComponent } from '../shared/components/modal-message/modal-message.component';


const routes: Routes = [{path: '', component: LoginViewComponent}];
@NgModule({
  declarations: [
    LoginViewComponent,
    ModalMessageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgxModule
  ],
  providers: [AuthService]
})
export class LoginModule { }
