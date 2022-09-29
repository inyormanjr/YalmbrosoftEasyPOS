import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { PageTitleComponent } from './page-title/page-title.component';
import { DashboardCounterComponent } from './dashboard-counter/dashboard-counter.component';
import { DashboardTransactionLineComponent } from './dashboard-transaction-line/dashboard-transaction-line.component';
import { DashboardNotificationItemComponent } from './dashboard-notification-item/dashboard-notification-item.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ItemManageSideBarComponent } from './item-manage-side-bar/item-manage-side-bar.component';



@NgModule({
  declarations: [
    CardComponent,
    PageTitleComponent,
    DashboardCounterComponent,
    DashboardTransactionLineComponent,
    DashboardNotificationItemComponent,
    NavBarComponent,
    ItemManageSideBarComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    CardComponent,
    PageTitleComponent,
    DashboardCounterComponent,
    DashboardTransactionLineComponent,
    DashboardNotificationItemComponent,
    NavBarComponent,
    ItemManageSideBarComponent,
  ],
})
export class AdminComponentsModule {}
