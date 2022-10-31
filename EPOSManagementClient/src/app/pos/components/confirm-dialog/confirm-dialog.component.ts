import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css'],
})
export class ConfirmDialogComponent implements OnInit {

  message?: string;
  confirmBtnName: string = 'Confirm';
  cancelBtnName: string = 'Decline';
  result: boolean = false;
  constructor(public bsModalRef: BsModalRef) {}

  confirm() {
    this.bsModalRef.onHide?.emit(true);
    this.bsModalRef?.hide();
  }

  decline() {
    this.bsModalRef.onHide?.emit(false);
    this.bsModalRef?.hide();
  }

  ngOnInit(): void {}
}
