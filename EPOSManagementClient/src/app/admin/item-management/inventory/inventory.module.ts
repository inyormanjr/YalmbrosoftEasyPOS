import { AdminComponentsModule } from './../../admin-components/admin-components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryViewComponent } from './inventory-view/inventory-view.component';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{path: '', component: InventoryViewComponent}];
@NgModule({
  declarations: [
    InventoryViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AdminComponentsModule
  ]
})
export class InventoryModule { }
