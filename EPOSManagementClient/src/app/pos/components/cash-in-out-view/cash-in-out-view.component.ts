import { CashOutCategory } from 'src/app/models/cashoutcategory';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { PosService } from './../../services/pos.service';
import { Observable } from 'rxjs';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { CashInOut } from 'src/app/models/cashinout';
import { PosState } from '../../reducers';
import { PosActionTypes } from '../../actions/pos-actions.types';

@Component({
  selector: 'app-cash-in-out-view',
  templateUrl: './cash-in-out-view.component.html',
  styleUrls: ['./cash-in-out-view.component.css'],
})
export class CashInOutViewComponent implements OnInit {
  cashInOuts$: Observable<CashInOut[]>;
  cashInOutForm: FormGroup;
  cashInOutCategory$: Observable<CashOutCategory[]> | undefined;
  selectedCategory: CashOutCategory | undefined;
  constructor(
    private PosService: PosService,
    private toastR: ToastrService,
    private posStore: Store<PosState>,
    public bsModalRef: BsModalRef,
    private bsModalService: BsModalService,
    private fB: FormBuilder
  ) {
    this.cashInOuts$ = this.PosService.getCashInOuts().pipe(map((x: any) => x));
    this.cashInOutCategory$ = this.PosService.getCashOutCategories().pipe(
      map((x: any) => x)
    );
    this.cashInOutForm = fB.group({
      amount: [0.0],
      categoryName: ['', [Validators.required]],
      type: ['In'],
      isFromDrawer: [false],
      remarks: [''],
    });
  }

  ngOnInit(): void {}

  
  showEntryModal(templateRef: TemplateRef<any>) {
    this.bsModalRef = this.bsModalService.show(templateRef);
  }

  save() {
    const newObj = Object.assign({}, this.cashInOutForm.value);
    newObj.categoryName = this.selectedCategory?.name;
    newObj.type = this.selectedCategory?.type;
    this.PosService.createCashInOut(newObj).subscribe(x => {
      this.toastR.success('Transaction Complete');
      this.posStore.dispatch(PosActionTypes.loadPosConfig());
      this.cashInOutForm.reset();
      this.cashInOuts$ = this.PosService.getCashInOuts().pipe(map((x: any) => x));
      this.bsModalRef.hide();
    }, err => {
      console.log(err);
    });
  }
}
