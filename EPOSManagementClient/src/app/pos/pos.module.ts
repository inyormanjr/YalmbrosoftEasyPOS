import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PosViewComponent } from './pos-view/pos-view.component';
import { StoreModule } from '@ngrx/store';
import * as fromPosStore from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { PosEffectEffects } from './effects/pos-effect.effects';
import { PosProductCardComponent } from './components/pos-product-card/pos-product-card.component';


const routes: Routes = [{path: '', component: PosViewComponent}];
@NgModule({
  declarations: [
    PosViewComponent,
    PosProductCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(fromPosStore.posStoreFeatureKey, fromPosStore.reducers),
    EffectsModule.forFeature([PosEffectEffects])
  ]
})
export class PosModule { }
