import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PosTransaction } from './../../../models/pos-transaction';
import { PosService } from './../../services/pos.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pos-transactions-view',
  templateUrl: './pos-transactions-view.component.html',
  styleUrls: ['./pos-transactions-view.component.css'],
})
export class PosTransactionsViewComponent implements OnInit {
  posTransactions$: Observable<PosTransaction[]>;
  selectedTransaction?: PosTransaction;
  bsModalRef2: BsModalRef | undefined;
  constructor(
    private posService: PosService,
    public bsModalRef: BsModalRef,
    private modalService: BsModalService
  ) {
    this.posTransactions$ = posService.getCurrentTransactions();
  }

  ngOnInit(): void {}

  showTransactionView(template: TemplateRef<any>, transaction: PosTransaction) {
    this.selectedTransaction = transaction;
    this.bsModalRef2 = this.modalService.show(template);
  }
}
