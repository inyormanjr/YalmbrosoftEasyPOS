import { AuthService } from './../../../login/services/auth.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SupplierService } from '../../services/suppliers/supplier.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Supplier } from 'src/app/models/supplier';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-suppliers-view',
  templateUrl: './suppliers-view.component.html',
  styleUrls: ['./suppliers-view.component.css'],
})
export class SuppliersViewComponent implements OnInit {
  suppliers$: Observable<Supplier[]> | undefined;
  modalRef?: BsModalRef | null;
  supplierForm: FormGroup;
  constructor(
    private modalService: BsModalService,
    private authService: AuthService,
    private fB: FormBuilder,
    private supplierService: SupplierService,
    private toastr: ToastrService
  ) {
    this.supplierForm = fB.group({
      _id: [],
      name: [''],
      contact: [''],
      address: [''],
      email: [''],
      company: [''],
      dateCreated: [''],
      creator: [''],
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

  newSupplier(template: TemplateRef<any>) {
    this.supplierForm.reset();
     this.openModal(template);
  }

  updateSupplier(supplier: Supplier, template: TemplateRef<any>) {
    this.supplierForm.reset();
    this.supplierForm = this.fB.group({
      _id: [supplier._id],
      name: [supplier.name],
      contact: [supplier.contact],
      address: [supplier.address],
      email: [supplier.email],
      company: [supplier.company],
      dateCreated: [supplier.dateCreated],
      creator: [supplier.creator],
    });
    this.openModal(template);
  }

  saveSupplier() {
    const newSupplier = Object.assign({}, this.supplierForm.value);
    if (newSupplier._id) {
      this.supplierService.update(newSupplier._id, newSupplier).subscribe(
        (x: any) => {
          this.fetchSuppliers();
          this.toastr.success('Supplier details updated.', 'System');
        },
        (err) => this.toastr.error(err)
      );
    } else {
      this.supplierService.create(newSupplier).subscribe(
        (x: any) => {
          this.supplierForm.reset();
          this.modalRef?.hide();
          this.fetchSuppliers();
          this.toastr.success('New Supplier created.', 'System');
        },
        (err) => this.toastr.error(err)
      );
    }
  }
}
