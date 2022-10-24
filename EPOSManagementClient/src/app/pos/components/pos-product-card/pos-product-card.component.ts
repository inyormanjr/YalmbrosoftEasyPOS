import { Inventory } from './../../../models/item';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pos-product-card',
  templateUrl: './pos-product-card.component.html',
  styleUrls: ['./pos-product-card.component.css']
})
export class PosProductCardComponent implements OnInit {
  @Input() product: Inventory | undefined;
  @Input() click: Function | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
