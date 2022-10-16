import { Item } from 'src/app/models/item';
import { Observable } from 'rxjs';
import { ProductsState } from './../reducers/index';
import { ItemEntryComponent } from './../../item-entry/item-entry.component';
import { CategoryViewComponent } from './../../category/category-view/category-view.component';
import { SuppliersViewComponent } from '../../suppliers-view/suppliers-view.component';
import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Store } from '@ngrx/store';
import { ProductActionTypes } from '../actions/products.action.types';
import { ProductSelectorTypes } from '../selectors/products.selector.types';

@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  styleUrls: ['./products-view.component.css'],
})
export class ProductsViewComponent implements OnInit {
  searchInput: string = '';
  bsModalRef?: BsModalRef;
  products$: Observable<Item[]> | undefined;
  constructor(private modalService: BsModalService, private productStore: Store<ProductsState>) {
    productStore.dispatch(ProductActionTypes.loadProductss({searchString: null}));
  }

  ngOnInit(): void {
    this.products$ = this.productStore.select(ProductSelectorTypes.selectItems);
   }

  showSuppliers() {
    this.bsModalRef = this.modalService.show(SuppliersViewComponent,Object.assign({}, { class: 'modal-lg' }));
  }

  showCategories() {
    this.bsModalRef = this.modalService.show(
      CategoryViewComponent,
      Object.assign({}, { class: 'modal-lg' })
    );
  }

  showItemEntry() {
     this.bsModalRef = this.modalService.show(
       ItemEntryComponent,
       Object.assign({}, { class: 'modal-lg' })
     );
  }

  updateItem(initialItem: Item) {
    const initialState: ModalOptions = {
      initialState: {
        initialItem: initialItem,
      },
      class: 'modal-lg'
    };
    this.bsModalRef = this.modalService.show(ItemEntryComponent, initialState);
  }

  searchItem() {

        this.productStore.dispatch(
          ProductActionTypes.loadProductss({ searchString: this.searchInput })
        );
  }
}
