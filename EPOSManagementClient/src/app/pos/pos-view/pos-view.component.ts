import { SearchParams } from './../../shared/_models/search.params';
import { ToastrService } from 'ngx-toastr';
import { PosTransaction, PosTransactionDetails, Voucher } from './../../models/pos-transaction';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { PosActionTypes } from '../actions/pos-actions.types';
import { PosState } from '../reducers';
import { Category } from 'src/app/models/category';
import { Inventory } from 'src/app/models/item';
import { PosSelectorTypes } from '../selectors/pos-selector.types';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-pos-view',
  templateUrl: './pos-view.component.html',
  styleUrls: ['./pos-view.component.css'],
})
export class PosViewComponent implements OnInit {
  currentUser = '';
  currentCompany = '';
  newOrderQty = 1;
  newOrderUnitDiscount = 0;
  currentDiscountAmount = 0;
  currentPaymentAmount = 0;
  selectedInventory: Inventory | undefined;
  itemCart = [];
  currentFilter = '';
  posIsLoading$: Observable<boolean> | undefined;
  categories$: Observable<Category[]> | undefined;
  products$: Observable<Inventory[]> | undefined;
  isFetching$: Observable<boolean> | undefined;
  posTransaction: PosTransaction | undefined;
  bsModalRef?: BsModalRef;
  bsModalRef2?: BsModalRef;
  constructor(
    private posStore: Store<PosState>,
    private fB: FormBuilder,
    private toastR: ToastrService,
    private modalService: BsModalService
  ) {
    const currentUser = localStorage.getItem('username');
    const company = localStorage.getItem('company');

    if (currentUser && company) {
      this.currentUser = currentUser;
      this.currentCompany = company;
    }
    posStore.dispatch(PosActionTypes.loadPosCategories());
    posStore.dispatch(PosActionTypes.loadPosProducts({}));
    this.posTransaction = this.createNewPosTrans();
  }

  ngOnInit(): void {
    this.posIsLoading$ = this.posStore.select(
      PosSelectorTypes.selectPosIsLoading
    );
    this.categories$ = this.posStore.select(PosSelectorTypes.selectCategories);
    this.products$ = this.posStore.select(PosSelectorTypes.selectProducts);
    this.isFetching$ = this.posStore.select(
      PosSelectorTypes.selectIsFetchingProduct
    );
  }

  createNewPosTrans() {
    return {
      _id: '',
      company: '',
      creator: '',
      subTotal: 0,
      discount: 0,
      voucher: { _id: '', code: '', amount: 0, used: false },
      salesTax: 0,
      total: 0,
      totalBalance: 0,
      payment: 0,
      posTransDetails: [],
    };
  }

  showNeworderModal(inventory: Inventory, template: TemplateRef<any>) {
    this.newOrderUnitDiscount = 0;
    this.selectedInventory = inventory;
    this.bsModalRef = this.modalService.show(template);
  }

  showRefModal(template: TemplateRef<any>) {
    this.bsModalRef = this.modalService.show(template);
  }


  showAmountModal(template: TemplateRef<any>) {
    this.currentPaymentAmount = this.posTransaction?.totalBalance ?? 0;
    this.bsModalRef2 = this.modalService.show(template);
  }

  allowPayment() {
    return this.posTransaction?.payment ? true : false;
  }

  change() {
    let change = 0;
    if (this.posTransaction) {
      change = this.posTransaction?.payment - this.posTransaction?.totalBalance;
    }
    return change;
  }

  processVoucher() {
    if (this.posTransaction) {
      this.posTransaction.voucher.amount = 100;
      this.calculateAmounts();
      this.toastR.info('Voucher Accepted');
      this.bsModalRef?.hide();
    }
  }

  processDiscount() {
    if (this.posTransaction) {
      this.posTransaction.discount = this.currentDiscountAmount;
      this.calculateAmounts();
      this.toastR.info('Discounted Successfully');
      this.bsModalRef?.hide();
    }
  }

  clearAll() {
    if (this.posTransaction) {
      this.posTransaction.posTransDetails.splice(0);
      this.posTransaction.voucher.amount = 0;
      this.posTransaction.discount = 0;
      this.calculateAmounts();
      this.toastR.info('Order Cleared');
    }
  }

  calculateAmounts() {
    if (this.posTransaction) {
      this.posTransaction.subTotal =
        this.posTransaction.posTransDetails.reduce<number>((_accu, obj) => {
          return _accu + obj.orderQty * (obj.unitPrice - obj.unitDiscount);
        }, 0) ?? 0;

      this.posTransaction.total =
        this.posTransaction.subTotal - this.posTransaction.discount ?? 0;

      this.posTransaction.totalBalance =
        this.posTransaction.total - this.posTransaction.voucher.amount ?? 0;
        this.posTransaction.payment = this.posTransaction.totalBalance;
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
      this.posTransaction.posTransDetails[index].orderQty--;
      this.calculateAmounts();
    }
  }

  addQty(index: any, value: number) {
    if (this.posTransaction) {
      this.posTransaction.posTransDetails[index].orderQty++;
      this.calculateAmounts();
    }
  }

  checkExistOrder() {
    return this.posTransaction?.posTransDetails.find(
      (x) => x.inventory.variant._id == this.selectedInventory?.variant._id
    )
      ? true
      : false;
  }

  addToOrder() {
    if (this.selectedInventory) {
      if (this.checkExistOrder() && this.posTransaction) {
        let currentSelected = this.posTransaction.posTransDetails.find(
          (x) => x.inventory?.variant._id == this.selectedInventory?.variant._id
        );
        if (currentSelected?.orderQty) {
          currentSelected.orderQty += this.newOrderQty;
        }
      } else {
        const newDetails: PosTransactionDetails = {
          inventory: this.selectedInventory,
          orderQty: this.newOrderQty,
          unitDiscount: this.newOrderUnitDiscount,
          unitPrice: this.selectedInventory.variant.unitPrice,
          totalPrice: this.selectedInventory.variant.unitPrice * 1,
        };
        this.posTransaction?.posTransDetails.push(newDetails);
      }
      this.newOrderQty = 1;
      this.calculateAmounts();
      this.selectedInventory = undefined;
      this.bsModalRef?.hide();
    }
  }

  acceptAmount() {
    this.calculateAmounts();
    if(this.posTransaction)
    this.posTransaction.payment = this.currentPaymentAmount;
    this.bsModalRef2?.hide();
  }

  onCategoryChanged(value?: any) {
    this.currentFilter = value;
    const searchParams: SearchParams = { key: '', value: '' };
    if (this.currentFilter.length > 0) {
      searchParams.key = 'category';
      searchParams.value = this.currentFilter;
    }
    this.posStore.dispatch(
      PosActionTypes.loadPosProducts({ data: searchParams })
    );
  }
}
