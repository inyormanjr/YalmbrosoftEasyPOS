import { AuthService } from './../../../login/services/auth.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SupplierService } from '../../services/suppliers/supplier.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Supplier } from 'src/app/models/supplier';

@Component({
  selector: 'app-suppliers-view',
  templateUrl: './suppliers-view.component.html',
  styleUrls: ['./suppliers-view.component.css'],
})
export class SuppliersViewComponent implements OnInit {
  suppliers$: Observable<Supplier[]> | undefined;
  modalRef?: BsModalRef | null;
  supplierForm: FormGroup;
  constructor(private modalService: BsModalService,
    private authService: AuthService,
    private fB: FormBuilder, private supplierService: SupplierService) {
    this.supplierForm = fB.group({
      name: ['test'],
      contact: [''],
      address: [''],
      email: [''],
      company: [''],
      creator: ['']
    });
  }

  ngOnInit(): void {

    this.fetchSuppliers();
  }

  fetchSuppliers() {
    this.suppliers$ = this.supplierService
      .getMany()
      .pipe(map((x: any) => x.data));
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-md mt-3',
    });
  }

  saveSupplier() {
    const newSupplier = Object.assign({}, this.supplierForm.value);
    this.supplierService.create(newSupplier).subscribe((x: any) => {
      this.modalRef?.hide();
      this.fetchSuppliers();
    }, err => console.log(err));
  }
}
