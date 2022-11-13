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

    const creator = invTrans.creator;
    const transType = invTrans.type;
    const transItemName = invTrans.itemName;
    const transQty = invTrans.quantity;
    const transVariant = invTrans.variant.unitValue + invTrans.variant.unitType;
    return transType + ' ' + transQty + ' of ' + transItemName + ' ' + transVariant ;
  }

}
