import { ProductsState } from './../reducers/index';
import { ItemService } from './../../../services/item/item.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ProductActionTypes } from '../actions/products.action.types';
import { tap, map } from 'rxjs/operators';
import { Item } from 'src/app/models/item';
import { noop } from 'rxjs';



@Injectable()
export class ProductEffects {
  fetchItems$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductActionTypes.loadProductss),
        tap((action) => {
          this.itemService.getMany().pipe(map((data: any) => {
            this.productStore.dispatch(ProductActionTypes.loadProductsSuccess({ data: data.data }));
          })).subscribe(noop, (error) => { });
        })
      ),{ dispatch: false }
  );


  constructor(private actions$: Actions, private itemService: ItemService,
  private productStore: Store<ProductsState>) { }

}
