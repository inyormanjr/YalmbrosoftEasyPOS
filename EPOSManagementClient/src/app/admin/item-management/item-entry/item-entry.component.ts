import { ProductsState } from './../products/reducers/index';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Supplier } from 'src/app/models/supplier';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ItemService } from './../../services/item/item.service';
import { SupplierService } from './../../services/suppliers/supplier.service';
import { CategoryService } from './../../services/category/category.service';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { ProductActionTypes } from '../products/actions/products.action.types';

@Component({
  selector: 'app-item-entry',
  templateUrl: './item-entry.component.html',
  styleUrls: ['./item-entry.component.css'],
})
export class ItemEntryComponent implements OnInit {
  isProcessing: boolean = false;
  itemForm: FormGroup;
  categories$: Observable<Category[]> | undefined;
  suppliers$: Observable<Supplier[]> | undefined;
  constructor(
    private categoryService: CategoryService,
    private supplierService: SupplierService,
    private itemService: ItemService,
    private fB: FormBuilder,
    private toastr: ToastrService,
    private productStore: Store<ProductsState>
  ) {
    this.itemForm = fB.group({
      _id: [],
      name: [''],
      company: [''],
      category: [''],
      supplier: [],
      description: [''],
      itemCode: [''],
      unitType: [''],
      unitValue: [''],
      unitCost: [0.0],
      unitPrice: [0.0],
      dateCreated: [],
      creator: [''],
    });
  }

  ngOnInit(): void {
    this.categories$ = this.categoryService
      .getMany()
      .pipe(map((x: any) => x.data));
    this.suppliers$ = this.supplierService
      .getMany()
      .pipe(map((x: any) => x.data));
  }

  save() {
    const newObj = Object.assign({}, this.itemForm.value);
     this.itemService.create(newObj).subscribe(
       (x: any) => {
         this.isProcessing = true;
         this.itemForm.reset();
         this.productStore.dispatch(ProductActionTypes.loadProductss());
         this.toastr.success('New Item created.', 'System');
       },
       (err) => {
         this.isProcessing = false;
         this.toastr.error(err);
       }
     );
  }
}
