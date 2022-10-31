import { ToastrService } from 'ngx-toastr';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PosService } from './../../services/pos.service';
import { PosConfig } from './../../../models/pos.config';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PosState } from '../../reducers';
import { PosSelectorTypes } from '../../selectors/pos-selector.types';
import { PosActionTypes } from '../../actions/pos-actions.types';

@Component({
  selector: 'app-pos-config-view',
  templateUrl: './pos-config-view.component.html',
  styleUrls: ['./pos-config-view.component.css']
})
export class PosConfigViewComponent implements OnInit {
  posConfigForm: FormGroup;
  constructor(
    fB: FormBuilder,
    private posStore: Store<PosState>,
    private posService: PosService,
    public bsModalRef: BsModalRef,
    private toastr: ToastrService) {
    this.posConfigForm = fB.group({
     _id: [],
     companyId: [],
     cashOnDrawer: [],
     salesTaxPercentage: [],
     posConfigTransactions: [[]]
    });
    posStore.select(PosSelectorTypes.selectPosConfig).subscribe((x: any) => {
      this.posConfigForm?.patchValue(x);
    });
  }

  ngOnInit(): void {
  }

  update() {

    this.posService
      .updatePosConfig(this.posConfigForm.value._id, this.posConfigForm.value)
      .subscribe(
        (x) => {
          this.posStore.dispatch(PosActionTypes.loadPosConfig());
          this.toastr.success('POS Config Updated');
          this.bsModalRef.hide();
        },
        (err) => this.toastr.error(err)
      );
  }

}
