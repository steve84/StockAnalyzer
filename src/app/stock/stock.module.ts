import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DataTableModule, SharedModule, DialogModule } from 'primeng/primeng';

import { StockService } from './stock.service';

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
    SharedModule
  ],
  exports: [
    StockComponent
  ],
  providers: [
    StockService
  ],
  declarations: [StockComponent, FundamentalComponent]
})
export class StockModule { }
