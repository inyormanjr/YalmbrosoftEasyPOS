import { AdminComponentsModule } from './admin-components/admin-components.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminViewComponent } from './admin-view/admin-view.component';
import {  RouterModule, Routes } from '@angular/router';


const route: Routes = [{
  path: '', component: AdminViewComponent, children: [
    { path: 'home', loadChildren: () => import('../admin/home/home.module').then(x => x.HomeModule) },
    { path: 'item-management', loadChildren: () => import('../admin/item-management/item-management.module').then(x => x.ItemManagementModule)},
    { path: '', redirectTo: 'home', pathMatch: 'full'}
]}];
@NgModule({
  declarations: [
    AdminViewComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    AdminComponentsModule
  ],
  exports: []
})
export class AdminModule { }
