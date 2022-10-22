import { Routes, RouterModule } from '@angular/router';
import { NgxModule } from 'src/app/shared/ngx-bootstrap/ngx/ngx.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementViewComponent } from './user-management-view/user-management-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import * as fromStores from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { UserManagementEffects } from './effects/user-management.effects';


const route: Routes = [{ path: '', component: UserManagementViewComponent}];
@NgModule({
  declarations: [
    UserManagementViewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxModule,
    RouterModule.forChild(route),
    StoreModule.forFeature(fromStores.userManagementFeatureKey, fromStores.reducers),
    EffectsModule.forFeature([UserManagementEffects])
  ]
})
export class UserManagementModule { }
