import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-notification-item',
  templateUrl: './dashboard-notification-item.component.html',
  styleUrls: ['./dashboard-notification-item.component.css']
})
export class DashboardNotificationItemComponent implements OnInit {
  @Input() details = '';
  constructor() { }

  ngOnInit(): void {
  }

}
