import { AdminComponentsModule } from './admin-components/admin-components.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminViewComponent } from './admin-view/admin-view.component';
import {  RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import * as fromAdmin from './reducers';


const route: Routes = [{
  path: '', component: AdminViewComponent, children: [
    { path: 'dashboard', loadChildren: () => import('../admin/home/home.module').then(x => x.HomeModule) },
    { path: 'item-management', loadChildren: () => import('../admin/item-management/item-management.module').then(x => x.ItemManagementModule)},
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'user-management', loadChildren: () => import('../admin/user-management/user-management.module').then(x => x.UserManagementModule)}
    ]}];
@NgModule({
  declarations: [
    AdminViewComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    AdminComponentsModule,
    StoreModule.forFeature(fromAdmin.adminFeatureKey, fromAdmin.adminReducer)
  ],
  exports: []
})
export class AdminModule { }
