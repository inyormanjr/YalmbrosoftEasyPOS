import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-counter',
  templateUrl: './dashboard-counter.component.html',
  styleUrls: ['./dashboard-counter.component.css']
})
export class DashboardCounterComponent implements OnInit {

  @Input() count = 0;
  @Input() isCurrency = false;
  constructor() { }

  ngOnInit(): void {
  }

}
