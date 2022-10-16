import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsViewComponent } from './products-view/products-view.component';
import { Routes, RouterModule } from '@angular/router';
import { NgxModule } from 'src/app/shared/ngx-bootstrap/ngx/ngx.module';
import { StoreModule } from '@ngrx/store';
import * as fromProducts from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './effect/product.effects';


const routes: Routes = [{ path: '', component: ProductsViewComponent }];
@NgModule({
  declarations: [ProductsViewComponent],
  imports: [CommonModule, RouterModule.forChild(routes), NgxModule,
    FormsModule,
    ReactiveFormsModule,
    NgxModule,
    StoreModule.forFeature(fromProducts.productsFeatureKey, fromProducts.productReducer),
    EffectsModule.forFeature([ProductEffects])],
})
export class ProductsModule {}
