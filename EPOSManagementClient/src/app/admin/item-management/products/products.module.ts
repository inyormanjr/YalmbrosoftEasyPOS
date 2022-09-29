
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsViewComponent } from './products-view/products-view.component';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{ path: '', component: ProductsViewComponent }];
@NgModule({
  declarations: [
    ProductsViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ProductsModule { }
