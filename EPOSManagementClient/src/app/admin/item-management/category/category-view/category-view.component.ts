import { CategoryService } from './../../../services/category/category.service';
import { Observable } from 'rxjs';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Category } from 'src/app/models/category';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/login/services/auth.service';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.css'],
})
export class CategoryViewComponent implements OnInit {
  categories$: Observable<Category[]> | undefined;
  modalRef?: BsModalRef | null;
  categoryForm: FormGroup;
  constructor(
    private modalService: BsModalService,
    private authService: AuthService,
    private fB: FormBuilder,
    private categoryService: CategoryService,
    private toastr: ToastrService
  ) {
    this.categoryForm = fB.group({
      _id: [],
      name: [''],
      company: [''],
      dateCreated: [''],
      creator: [''],
    });
  }

  ngOnInit(): void {
    this.fetch();
  }
  fetch() {
    this.categories$ = this.categoryService
      .getMany()
      .pipe(map((x: any) => x.data));
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-md mt-3',
    });
  }

  newItem(template: TemplateRef<any>) {
    this.categoryForm.reset();
    this.openModal(template);
  }

  update(category: Category, template: TemplateRef<any>) {
    this.categoryForm.reset();
    this.categoryForm = this.fB.group({
      _id: [category._id],
      name: [category.name],
      company: [category.company],
      dateCreated: [category.dateCreated],
      creator: [category.creator],
    });
    this.openModal(template);
  }

  save() {
    const newObj = Object.assign({}, this.categoryForm.value);
    if (newObj._id) {
      this.categoryService.update(newObj._id, newObj).subscribe(
        (x: any) => {
          this.fetch();
          this.toastr.success('Category details updated.', 'System');
        },
        (err) => this.toastr.error(err)
      );
    } else {
      this.categoryService.create(newObj).subscribe(
        (x: any) => {
          this.categoryForm.reset();
          this.modalRef?.hide();
          this.fetch();
          this.toastr.success('New Category created.', 'System');
        },
        (err) => this.toastr.error(err)
      );
    }
  }
}
