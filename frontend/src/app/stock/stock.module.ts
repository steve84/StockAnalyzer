import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DataTableModule,
         SharedModule,
				 DialogModule,
				 ButtonModule,
				 TabViewModule,
				 AccordionModule,
				 AutoCompleteModule,
				 DropdownModule,
         InputTextModule,
         MultiSelectModule,
         SliderModule,
         MessagesModule,
         SelectButtonModule } from 'primeng/primeng';

import { ChartModule } from 'angular-highcharts';

import { StockService } from './stock.service';
import { FundamentalService } from './fundamental.service';
import { TechnicalDataService } from './technicaldata.service';
import { IndexService } from './index.service';

import { stockRoutes } from './stock.routes';

import { StockTableComponent } from './stocktable/stocktable.component';
import { FundamentalComponent } from './fundamental/fundamental.component';
import { LevermannComponent } from './levermann/levermann.component';
import { IndexComponent } from './index/index.component';
import { IndexdetailComponent } from './indexdetail/indexdetail.component';
import { StockcategoryPipe } from './stockcategory.pipe';
import { StockquickfinderComponent } from './stockquickfinder/stockquickfinder.component';
import { StocksearchComponent } from './stocksearch/stocksearch.component';
import { ScorecombinerComponent } from './scorecombiner/scorecombiner.component';

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
    AccordionModule,
		AutoCompleteModule,
    DropdownModule,
		MultiSelectModule,
    InputTextModule,
    SliderModule,
    MessagesModule,
    SelectButtonModule,
    SharedModule,
    ChartModule
  ],
  exports: [
    StockTableComponent,
    StockquickfinderComponent,
    FundamentalComponent,
    IndexdetailComponent
  ],
  providers: [
    StockService,
    FundamentalService,
    TechnicalDataService,
    IndexService
  ],
  declarations: [StockTableComponent, FundamentalComponent, LevermannComponent, IndexComponent, IndexdetailComponent, StockcategoryPipe, StockquickfinderComponent, StocksearchComponent, ScorecombinerComponent]
})
export class StockModule { }
