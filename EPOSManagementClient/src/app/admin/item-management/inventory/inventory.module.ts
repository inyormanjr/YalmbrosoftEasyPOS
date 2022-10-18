import { AdminComponentsModule } from './../../admin-components/admin-components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryViewComponent } from './inventory-view/inventory-view.component';
import { Routes, RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import * as from from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { InventoryEffects } from './effects/inventory.effects';


const routes: Routes = [{path: '', component: InventoryViewComponent}];
@NgModule({
  declarations: [
    InventoryViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AdminComponentsModule,
    StoreModule.forFeature(from.inventoryFeatureKey, from.reducers),
    EffectsModule.forFeature([InventoryEffects])
  ]
})
export class InventoryModule { }
