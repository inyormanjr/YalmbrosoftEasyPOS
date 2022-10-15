import { ReactiveFormsModule } from '@angular/forms';
import { AdminComponentsModule } from './../admin-components/admin-components.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemManageViewComponent } from './item-manage-view/item-manage-view.component';
import { SuppliersViewComponent } from './suppliers-view/suppliers-view.component';
import { CategoryViewComponent } from './category/category-view/category-view.component';
import { ItemEntryComponent } from './item-entry/item-entry.component';


const routes: Routes = [{
  path: '', component: ItemManageViewComponent, children: [
    { path: 'products', loadChildren: () => import('../item-management/products/products.module').then(x => x.ProductsModule) },
    { path: 'inventory', loadChildren: () => import('../item-management/inventory/inventory.module').then(x => x.InventoryModule)},
    { path: '', redirectTo: 'products', pathMatch: 'full'}
]}];
@NgModule({
  declarations: [
    ItemManageViewComponent,
    SuppliersViewComponent,
    CategoryViewComponent,
    ItemEntryComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    AdminComponentsModule
  ]
})
export class ItemManagementModule { }
