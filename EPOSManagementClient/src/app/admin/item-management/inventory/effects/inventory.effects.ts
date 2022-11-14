import { InventoryState } from './../reducers/index';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ItemService } from 'src/app/admin/services/item/item.service';
import { InventoryActionTypes } from '../actions/inventory.action.types';
import { noop } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable()
export class InventoryEffects {
  fetchInventoryTransactions$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(InventoryActionTypes.loadStockMovement),
        tap((action) => {
          this.itemService
            .getStockMovement(action.page)
            .pipe(
              map((data: any) => {
                this.inventoryStore.dispatch(
                  InventoryActionTypes.loadStockMovementSuccess({
                    data: data.data,
                  })
                );
              })
            )
            .subscribe(noop, (error) => {});
        })
      ),
    { dispatch: false }
  );

  fetchInventory$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(InventoryActionTypes.loadInventorys),
        tap((action) => {
          this.itemService
            .getManyInventory(action.search)
            .pipe(
              map((data: any) => {
                this.inventoryStore.dispatch(
                  InventoryActionTypes.loadInventorysSuccess({
                    data: data.data,
                  })
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
