import { ToastrService } from 'ngx-toastr';
import { PosTransaction, PosTransactionDetails } from './../../models/pos-transaction';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PosActionTypes } from '../actions/pos-actions.types';
import { PosState } from '../reducers';
import { Category } from 'src/app/models/category';
import { Inventory } from 'src/app/models/item';
import { PosSelectorTypes } from '../selectors/pos-selector.types';

@Component({
  selector: 'app-pos-view',
  templateUrl: './pos-view.component.html',
  styleUrls: ['./pos-view.component.css'],
})
export class PosViewComponent implements OnInit {
  itemCart = [];
  currentFilter = '';
  posIsLoading$: Observable<boolean> | undefined;
  categories$: Observable<Category[]> | undefined;
  products$: Observable<Inventory[]> | undefined;
  posTransForm: FormGroup | undefined;
  posTransaction: PosTransaction | undefined;
  constructor(private posStore: Store<PosState>, private fB: FormBuilder,
  private toastR: ToastrService
  ) {
    posStore.dispatch(PosActionTypes.loadPosCategories());
    posStore.dispatch(PosActionTypes.loadPosProducts({}));
    this.posTransaction = this.createNewPosTrans();

    this.posTransForm = fB.group({
      _id: [],
      company: [],
      creator: [],
      posTransDetails: [fB.array([])],
    });
  }

  createNewPosTrans() {
    return {
      _id: '',
      company: '',
      creator: '',
      subTotal: 0,
      discount: 100,
      voucherAmount: 0,
      total: 0,
      posTransDetails: [],
    };
  }

  clearAll() {
    this.posTransaction?.posTransDetails.splice(0);
    this.calculateAmounts();
    this.toastR.info('Order Cleared');
  }

  calculateAmounts() {
    if (this.posTransaction) {
      this.posTransaction.subTotal = this.posTransaction.posTransDetails.reduce<number>((_accu, obj) => {
        return _accu + obj.orderQty * obj.unitPrice;
      }, 0) ?? 0;

      this.posTransaction.total =
        this.posTransaction.subTotal +
        this.posTransaction.voucherAmount -
        this.posTransaction.discount ?? 0;
    }
  }

  removeOrder(index: any) {
    if (this.posTransaction) {
      this.posTransaction.posTransDetails.splice(index, 1);
      this.calculateAmounts();
     }
  }

  minusQty(index: any, value: number) {
    if (this.posTransaction) {
      this.posTransaction.posTransDetails[index].orderQty =
        this.posTransaction.posTransDetails[index].orderQty - 1;
      this.calculateAmounts();
    }
  }

  addQty(index: any, value: number) {
    if (this.posTransaction) {
      this.posTransaction.posTransDetails[index].orderQty =
      this.posTransaction.posTransDetails[index].orderQty + 1;
      this.calculateAmounts();
    }
  }

  addToOrder(inventory: Inventory) {
    const newDetails: PosTransactionDetails = {
      inventory,
      orderQty: 1,
      unitPrice: inventory.variant.unitPrice,
      totalPrice: inventory.variant.unitPrice * 1,
    };
    this.posTransaction?.posTransDetails.push(newDetails);
    this.calculateAmounts();
  }

  get posTransDetailsForm(): FormGroup {
    return this.fB.group({
      inventory: [],
      orderQty: [],
      unitPrice: [],
      totalPrice: [],
    });
  }

  ngOnInit(): void {
    this.posIsLoading$ = this.posStore.select(
      PosSelectorTypes.selectPosIsLoading
    );
    this.categories$ = this.posStore.select(PosSelectorTypes.selectCategories);
    this.products$ = this.posStore.select(PosSelectorTypes.selectProducts);
  }

  onCategoryChanged(value?: any) {
    this.currentFilter = value;
  }
}
