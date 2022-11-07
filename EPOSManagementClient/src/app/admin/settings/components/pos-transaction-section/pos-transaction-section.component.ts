import { noop } from 'rxjs';
import { CashOutCategory } from './../../../../models/cashoutcategory';
import { ToastrService } from 'ngx-toastr';
import { PosService } from './../../../../pos/services/pos.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pos-transaction-section',
  templateUrl: './pos-transaction-section.component.html',
  styleUrls: ['./pos-transaction-section.component.css']
})
export class PosTransactionSectionComponent implements OnInit {
  cashOutCategories: CashOutCategory[] = [];
  newCategoryName = '';
  type = 'In';
  constructor(private posService: PosService, private toastR: ToastrService) { }

  ngOnInit(): void {
    this.posService.getCashOutCategories().subscribe(x => this.cashOutCategories.push(...x));
  }

  statusChanged(obj: any) {
    this.posService.updateCashOutCategory(obj._id, obj).subscribe(x => {
      this.toastR.success('Updated CashOut Category Status Successful');
    }, err => console.log(err));
  }

  create() {
    const newCashOutCategory: CashOutCategory = {_id: '', name: this.newCategoryName, type: this.type, isEnabled: true};
    this.posService.createCashOutCategory(newCashOutCategory).subscribe(x =>
    {
      this.toastR.success('CashOut Category Created');
      this.cashOutCategories.push(x);
      this.newCategoryName = '';
    },
      err => { });
  }

}
