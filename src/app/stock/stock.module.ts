import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { StockService } from './stock.service';


import { StockComponent } from './stock/stock.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
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
