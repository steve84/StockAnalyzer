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
        SelectButtonModule,
        SpinnerModule,
        ChartModule } from 'primeng/primeng';

import { StockService } from './stock.service';
import { IndexService } from './index.service';
import { FundamentalService } from './fundamental.service';

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
import { CountryTranslationPipe } from './country_translation.pipe';
import { BranchTranslationPipe } from './branch_translation.pipe';
import { CommonTranslationPipe } from './common_translation.pipe';
import { BalancetableComponent } from './balance/balancetable/balancetable.component';
import { BalancesheetComponent } from './balance/balancesheet/balancesheet.component';
import { FigurestableComponent } from '../base/figurestable/figurestable.component';
import { PiotroskiComponent } from './piotroski/piotroski.component';
import { MagicformulaComponent } from './magicformula/magicformula.component';

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
    ChartModule,
    SpinnerModule
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
    IndexService
  ],
  declarations: [StockTableComponent, FundamentalComponent, LevermannComponent, IndexComponent, IndexdetailComponent, StockcategoryPipe, StockquickfinderComponent, StocksearchComponent, ScorecombinerComponent, CountryTranslationPipe, BranchTranslationPipe, CommonTranslationPipe, BalancetableComponent, BalancesheetComponent, FigurestableComponent, PiotroskiComponent, MagicformulaComponent]
})
export class StockModule { }
