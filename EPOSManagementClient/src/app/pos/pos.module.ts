import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxModule } from 'src/app/shared/ngx-bootstrap/ngx/ngx.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PosViewComponent } from './pos-view/pos-view.component';
import { StoreModule } from '@ngrx/store';
import * as fromPosStore from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { PosEffectEffects } from './effects/pos-effect.effects';
import { PosProductCardComponent } from './components/pos-product-card/pos-product-card.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { PosConfigViewComponent } from './components/pos-config-view/pos-config-view.component';
import { PosTransactionsViewComponent } from './components/pos-transactions-view/pos-transactions-view.component';


const routes: Routes = [{path: '', component: PosViewComponent}];
@NgModule({
  declarations: [
    PosViewComponent,
    PosProductCardComponent,
    ConfirmDialogComponent,
    PosConfigViewComponent,
    PosTransactionsViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NgxModule,
    StoreModule.forFeature(fromPosStore.posStoreFeatureKey, fromPosStore.reducers),
    EffectsModule.forFeature([PosEffectEffects])
  ]
})
export class PosModule { }
