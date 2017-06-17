import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DataTableModule, SharedModule, DialogModule, ButtonModule, TabViewModule } from 'primeng/primeng';

import { ChartModule } from 'angular-highcharts';

import { StockService } from './stock.service';
import { FundamentalService } from './fundamental.service';
import { TechnicalDataService } from './technicaldata.service';

import { stockRoutes } from './stock.routes';

import { StockComponent } from './stock/stock.component';
import { FundamentalComponent } from './fundamental/fundamental.component';

@NgModule({
  imports: [
    RouterModule.forRoot(stockRoutes),
    CommonModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    DataTableModule,
    DialogModule,
    ButtonModule,
    TabViewModule,
    SharedModule,
    ChartModule
  ],
  exports: [
    StockComponent
  ],
  providers: [
    StockService,
    FundamentalService,
    TechnicalDataService
  ],
  declarations: [StockComponent, FundamentalComponent]
})
export class StockModule { }
