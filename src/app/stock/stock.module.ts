import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { DataTableModule, SharedModule } from 'primeng/primeng';

import { StockService } from './stock.service';


import { StockComponent } from './stock/stock.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    DataTableModule,
    SharedModule
  ],
  exports: [
    StockComponent
  ],
  providers: [
    StockService
  ],
  declarations: [StockComponent]
})
export class StockModule { }
