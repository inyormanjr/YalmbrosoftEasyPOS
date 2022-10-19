
import { ItemService } from 'src/app/admin/services/item/item.service';
import { Inventory, Variants, StockMovementType, InventoryTransaction } from './../../../../models/item';
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
  stockMovementType: StockMovementType = StockMovementType.StockIn;
  isLoading = false;
  stockInOutValue = 0;
  remarks = '';
  inventory$: Observable<Inventory[]> | undefined;
  inventoryTransaction$: Observable<InventoryTransaction[]> | undefined;
  modalRef?: BsModalRef | null;
  selectedInventory: Inventory | undefined;
  StockMovementType: any;
  constructor(
    private inventoryStore: Store<InventoryState>,
    private itemService: ItemService,
    private modalService: BsModalService,
    private toastr: ToastrService
  ) {
    this.inventoryStore.dispatch(InventoryActionTypes.loadInventorys());
    this.inventoryStore.dispatch(InventoryActionTypes.loadStockMovement({page: null}));

  }

  ngOnInit(): void {
    this.inventory$ = this.inventoryStore.select(
      InventorySelectorTypes.selectInventories
    );

    this.inventoryTransaction$ = this.inventoryStore.select(InventorySelectorTypes.selectInventoryTransactions);
  }

  openModalAsStockIn(inventory: Inventory, template: TemplateRef<any>) {
    this.openModal(StockMovementType.StockIn, inventory, template);
  }

  openModalAsStockOut(inventory: Inventory, template: TemplateRef<any>) {
    this.openModal(StockMovementType.StockOut, inventory, template);
  }

  openModal(
    stockMovementType: StockMovementType,
    inventory: Inventory,
    template: TemplateRef<any>
  ) {
    this.selectedInventory = inventory;
    this.stockMovementType = stockMovementType;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-md mt-3',
    });
  }

  updateInventory() {
    this.isLoading = true;
    if (this.selectedInventory)
      this.itemService
        .stockMovement(
          this.selectedInventory.variant._id,
          this.stockMovementType,
          this.stockInOutValue,
          this.selectedInventory,
          this.remarks
        )
        .subscribe(
          (x: any) => {
            this.inventoryStore.dispatch(InventoryActionTypes.loadInventorys());
            this.inventoryStore.dispatch(
              InventoryActionTypes.loadStockMovement({ page: null })
            );
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
