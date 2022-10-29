import { Item, Variants } from './../../../models/item';
import { ProductsState } from './../products/reducers/index';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
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
  isUpdate = false;
  saveButtonText = 'Save';
  isProcessing: boolean = false;
  itemForm: FormGroup;
  categories$: Observable<Category[]> | undefined;
  suppliers$: Observable<Supplier[]> | undefined;
  initialItem?: Item;
  constructor(
    private categoryService: CategoryService,
    private supplierService: SupplierService,
    private itemService: ItemService,
    private fB: FormBuilder,
    private toastr: ToastrService,
    private productStore: Store<ProductsState>
  ) {

      this.itemForm = this.fB.group({
        _id: [],
        name: [''],
        company: [''],
        category: [''],
        supplier: [],
        description: [''],
        itemCode: [''],
        itemType: [],
        barcode: [''],
        variants: this.fB.array([]),
        creator: [''],
      });
  }

  createForm() {
    this.itemForm = this.fB.group({
      _id: [],
      name: [''],
      company: [''],
      category: [''],
      supplier: [],
      description: [''],
      itemCode: [''],
      itemType: [],
      barcode: [''],
      variants: this.fB.array([]),
      creator: [''],
    });
  }

  get createVariantDetailsControl(): FormGroup {
    return this.fB.group(
      {
        _id: [],
        barcode: [''],
        name: [''],
        unitType: [''],
        unitValue: [''],
        unitCost: [0.0],
        unitPrice: [0.0],
        quantity: []
      },
    );
  }

  get variantControl(): FormArray {
    return this.itemForm.controls.variants as FormArray;
  }

  parseToInt(value: string) {
    return Number.parseInt(value);
  }

  addNewVariant() {
    this.variantControl.push(this.createVariantDetailsControl);
  }

  removeVariant(index: number) {
    if(this.variantControl.length > 1)
    this.variantControl.removeAt(index);
  }

  ngOnInit(): void {
    this.categories$ = this.categoryService
      .getMany()
      .pipe(map((x: any) => x.data));
    this.suppliers$ = this.supplierService
      .getMany()
      .pipe(map((x: any) => x.data));
    if (this.initialItem) {
      this.isUpdate = true;
      this.saveButtonText = 'Update';
       this.initialItem.variants.forEach((element) => {
        this.addNewVariant()});
       this.itemForm.patchValue(this.initialItem);
    }
    else
    this.addNewVariant();
  }

  generateItemCode() {
    const name = this.itemForm.get('name')?.value;
    if (name.length > 0) {
      const noVowels = name.replace(/[aeiou]/gi, '').replaceAll(' ', '');
      const category = this.itemForm.get('category')?.value;
      const categoryInitials = category
        .split(' ')
        .map((word: any) => word[0])
        .join('');
      const itemCode = categoryInitials + '-' + noVowels;
      return itemCode.toLowerCase();
    } else {
      return '';
    }
  }

  save() {
    const newObj = Object.assign({}, this.itemForm.value);

    this.isProcessing = true;

    if (!newObj._id)
    this.itemService.create(newObj).subscribe(
      (x: any) => {
        this.isProcessing = false;
        this.createForm();
        this.addNewVariant();
        this.productStore.dispatch(ProductActionTypes.loadProductss({searchString: null}));
        this.toastr.success('New Item created.', 'System');
      },
      (err) => {
        this.isProcessing = false;
        this.toastr.error(err);
      }
    );
    else
      this.itemService.update(newObj._id, newObj).subscribe(
      (x: any) => {
          this.isProcessing = false;
          this.itemForm.patchValue(x.data);
          console.log(this.itemForm.value);
        this.productStore.dispatch(ProductActionTypes.loadProductss({searchString: null}));
        this.toastr.success(' Item Updated Successfully.', 'System');
      },
      (err) => {
        this.isProcessing = false;
        this.toastr.error(err);
      }
    );
  }
  trackByFn(index: any, item: any) {
    return index;
  }
}
