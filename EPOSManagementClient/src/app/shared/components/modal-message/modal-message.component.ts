import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-message',
  templateUrl: './modal-message.component.html',
  styleUrls: ['./modal-message.component.css'],
})
export class ModalMessageComponent implements OnInit {
  message?: string;
  title?: string;
  closeBtnName?: string;
  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit(): void {}
}
