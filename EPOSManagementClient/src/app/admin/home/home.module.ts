import { AdminComponentsModule } from './../admin-components/admin-components.module';

import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeViewComponent } from './home-view/home-view.component';


const routes: Routes = [{path: '', component: HomeViewComponent}];
@NgModule({
  declarations: [
    HomeViewComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AdminComponentsModule
  ]
})
export class HomeModule { }
