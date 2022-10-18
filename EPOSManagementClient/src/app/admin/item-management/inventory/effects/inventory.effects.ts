import { InventoryState } from './../reducers/index';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ItemService } from 'src/app/admin/services/item/item.service';
import { InventoryActionTypes } from '../actions/inventory.action.types';
import { noop } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { ProductActionTypes } from '../../products/actions/products.action.types';



@Injectable()
export class InventoryEffects {
  fetchInventory$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(InventoryActionTypes.loadInventorys),
        tap((action) => {
          this.itemService
            .getManyInventory()
            .pipe(
              map((data: any) => {
                this.inventoryStore.dispatch(
                  InventoryActionTypes.loadInventorysSuccess({ data: data.data })
                );
              })
            )
            .subscribe(noop, (error) => {});
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private itemService: ItemService,
    private inventoryStore: Store<InventoryState>
  ) {}
}
