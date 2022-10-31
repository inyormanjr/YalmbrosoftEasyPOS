import { posInitialState } from './../reducers/index';
import { PosService } from './../services/pos.service';
import { CategoryService } from './../../admin/services/category/category.service';
import { ItemService } from 'src/app/admin/services/item/item.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import { PosState } from '../reducers';
import { Store } from '@ngrx/store';
import { PosActionTypes } from '../actions/pos-actions.types';
import { noop } from 'rxjs';



@Injectable()
export class PosEffectEffects {
  fetchPosConfig$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PosActionTypes.loadPosConfig),
        tap((action) => {
          this.posService
            .getPosConfig()
            .pipe(
              map((data: any) => {
                this.posStore.dispatch(
                  PosActionTypes.loadPosConfigSuccess({ data: data })
                );
              })
            )
            .subscribe(noop, (error) => {});
        })
      ),
    { dispatch: false }
  );

  fetchCategories$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PosActionTypes.loadPosCategories),
        tap((action) => {
          this.categoryService
            .getMany()
            .pipe(
              map((result: any) => {
                this.posStore.dispatch(
                  PosActionTypes.loadPosCategoriesSuccess({ data: result.data })
                );
              })
            )
            .subscribe(noop, (error) => {});
        })
      ),
    { dispatch: false }
  );

  fetchItems$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PosActionTypes.loadPosProducts),
        tap((action) => {
          this.itemService
            .getManyProducts(action.data)
            .pipe(
              map((result: any) => {
                this.posStore.dispatch(
                  PosActionTypes.loadPosProductsSuccess({ data: result.data })
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
    private categoryService: CategoryService,
    private itemService: ItemService,
    private posStore: Store<PosState>,
    private posService: PosService
  ) {}
}
