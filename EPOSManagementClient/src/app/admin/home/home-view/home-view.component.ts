import { InventoryTransaction } from './../../../models/item';
import { PosTransaction } from './../../../models/pos-transaction';
import { DashboardService } from './../../services/dashboard/dashboard.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { DashboardInfo } from 'src/app/models/dashboard.info';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css']
})
export class HomeViewComponent implements OnInit {
  dashboardInfo$: Observable<DashboardInfo> | undefined;
  constructor(private dashboardService: DashboardService) {
    this.dashboardInfo$ = this.dashboardService.getDashboardInfo();
  }

  ngOnInit(): void {
  }

  inventoryTransDetailsBuilder(invTrans: InventoryTransaction) {

    const d1 = invTrans.creator;
    const d2 = invTrans.type;
    const d3 = invTrans.itemName;
    const d4 = invTrans.quantity;
    const d5 = invTrans.variant.unitValue + invTrans.variant.unitType;
    return d2 + ' ' + d4 + ' of ' + d3 + ' ' + d5 + ' by ' + d1;
  }

}
