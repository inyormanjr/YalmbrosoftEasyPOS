import { Component, OnInit } from '@angular/core';

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
  constructor() {}

  ngOnInit(): void {}
}
