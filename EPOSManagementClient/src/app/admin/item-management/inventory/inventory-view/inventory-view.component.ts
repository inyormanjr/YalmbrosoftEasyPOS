
import { ItemService } from 'src/app/admin/services/item/item.service';
import { Inventory, Variants } from './../../../../models/item';
import { map } from 'rxjs/operators';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { InventoryActionTypes } from '../actions/inventory.action.types';
import { InventoryState } from '../reducers';
import { Observable } from 'rxjs';
import { Item } from 'src/app/models/item';
import { InventorySelectorTypes } from '../selectors/inventory.selector.types';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inventory-view',
  templateUrl: './inventory-view.component.html',
  styleUrls: ['./inventory-view.component.css'],
})
export class InventoryViewComponent implements OnInit {
  isStockIn = true;
  isLoading = false;
  stockInOutValue = 0;
  inventory$: Observable<Inventory[]> | undefined;
  modalRef?: BsModalRef | null;
  selectedInventory: Inventory | undefined;
  constructor(
    private inventoryStore: Store<InventoryState>,
    private itemService: ItemService,
    private modalService: BsModalService,
    private toastr: ToastrService
  ) {
    this.inventoryStore.dispatch(InventoryActionTypes.loadInventorys());
  }

  ngOnInit(): void {
    this.inventory$ = this.inventoryStore.select(
      InventorySelectorTypes.selectInventories
    );
  }
  openModal(
    isStockIn: boolean,
    inventory: Inventory,
    template: TemplateRef<any>
  ) {
    this.selectedInventory = inventory;
    this.isStockIn = isStockIn;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-md mt-3',
    });
  }

  updateInventory() {
    this.isLoading = true;
    if (this.isStockIn && this.selectedInventory) {
      this.stockInInventory(this.selectedInventory?.variant);
    }
    else if (!this.isStockIn && this.selectedInventory) {
      this.stockOutInventory(this.selectedInventory?.variant);
    }
  }

  stockInInventory(variant: Variants) {
    const newVariant = Object.assign({}, variant);
    newVariant.quantity = variant.quantity + this.stockInOutValue;
    this.itemService.updateSingleVariant(newVariant._id, newVariant).subscribe(
      (x: any) => {
        this.inventoryStore.dispatch(InventoryActionTypes.loadInventorys());
        this.isLoading = false;
        this.modalRef?.hide();
        this.stockInOutValue = 0;
        this.toastr.success('Inventory Updated.', 'System');
      },
      (err) => {
        this.isLoading = false;
        this.toastr.error(err);
      }
    );
  }

  stockOutInventory(variant: Variants) {
    const newVariant = Object.assign({}, variant);
    newVariant.quantity = variant.quantity - this.stockInOutValue;
    this.itemService.updateSingleVariant(newVariant._id, newVariant).subscribe(
      (x: any) => {
        this.inventoryStore.dispatch(InventoryActionTypes.loadInventorys());
        this.isLoading = false;
        this.modalRef?.hide();
        this.stockInOutValue = 0;
        this.toastr.success('Inventory Updated.', 'System');
      },
      (err) => {
        this.isLoading = false;
        this.toastr.error(err);
      }
    );
  }
}
