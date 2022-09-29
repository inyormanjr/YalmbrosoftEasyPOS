import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-transaction-line',
  templateUrl: './dashboard-transaction-line.component.html',
  styleUrls: ['./dashboard-transaction-line.component.css']
})
export class DashboardTransactionLineComponent implements OnInit {
  @Input() transDetails = '';
  @Input() trasnDate = '';
  constructor() { }

  ngOnInit(): void {
  }

}
