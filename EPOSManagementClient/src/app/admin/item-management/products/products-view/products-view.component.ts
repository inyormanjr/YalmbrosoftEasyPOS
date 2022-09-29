import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  styleUrls: ['./products-view.component.css']
})
export class ProductsViewComponent implements OnInit {
  items = [1,2,3,4,5,6,7,8,9,10];
  constructor() { }

  ngOnInit(): void {
  }

}
