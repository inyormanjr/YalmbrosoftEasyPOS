import { CategoryViewComponent } from './../../category/category-view/category-view.component';
import { SuppliersViewComponent } from '../../suppliers-view/suppliers-view.component';
import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  styleUrls: ['./products-view.component.css'],
})
export class ProductsViewComponent implements OnInit {
  items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  bsModalRef?: BsModalRef;
  constructor(private modalService: BsModalService) {}

  ngOnInit(): void { }

  showSuppliers() {
    this.bsModalRef = this.modalService.show(SuppliersViewComponent,Object.assign({}, { class: 'modal-lg' }));
  }

  showCategories() {
    this.bsModalRef = this.modalService.show(
      CategoryViewComponent,
      Object.assign({}, { class: 'modal-lg' })
    );
  }
}
