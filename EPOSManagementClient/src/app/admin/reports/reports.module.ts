import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StocksReportViewComponent } from './stocks-report-view/stocks-report-view.component';
import { SalesReportViewComponent } from './sales-report-view/sales-report-view.component';



@NgModule({
  declarations: [
    StocksReportViewComponent,
    SalesReportViewComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ReportsModule { }
