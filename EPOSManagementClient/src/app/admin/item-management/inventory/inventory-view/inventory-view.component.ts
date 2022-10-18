import { Inventory } from './../../../../models/item';
import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { InventoryActionTypes } from '../actions/inventory.action.types';
import { InventoryState } from '../reducers';
import { Observable } from 'rxjs';
import { Item } from 'src/app/models/item';
import { InventorySelectorTypes } from '../selectors/inventory.selector.types';

@Component({
  selector: 'app-inventory-view',
  templateUrl: './inventory-view.component.html',
  styleUrls: ['./inventory-view.component.css'],
})
export class InventoryViewComponent implements OnInit {
  items = [
    { name: 'item1', qty: 5, supplier: 'Supplier One' },
    { name: 'item1', qty: 5, supplier: 'Supplier One' },
    ,
    { name: 'item1', qty: 5, supplier: 'Supplier One' },
    { name: 'item1', qty: 5, supplier: 'Supplier One' },
    { name: 'item1', qty: 5, supplier: 'Supplier One' },
    { name: 'item1', qty: 5, supplier: 'Supplier One' },
    { name: 'item1', qty: 5, supplier: 'Supplier One' },
  ];

  inventory$: Observable<Inventory[]> | undefined;
  constructor(private inventoryStore: Store<InventoryState>) {
    this.inventoryStore.dispatch(InventoryActionTypes.loadInventorys());
  }

  ngOnInit(): void {
    this.inventory$ = this.inventoryStore.select(InventorySelectorTypes.selectInventories);
  }
}
