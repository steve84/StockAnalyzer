import { Routes } from '@angular/router';

import { StockTableComponent } from './stocktable/stocktable.component';
import { StocksearchComponent } from './stocksearch/stocksearch.component';
import { ScorecombinerComponent } from './scorecombiner/scorecombiner.component';
import { FundamentalComponent } from './fundamental/fundamental.component';
import { IndexComponent } from './index/index.component';

export const stockRoutes: Routes = [
  { path: 'stocks/search', component: StocksearchComponent },
  { path: 'stocks/:id', component: FundamentalComponent },
  { path: 'stocks', component: StockTableComponent },
  { path: 'combiner', component: ScorecombinerComponent },
  { path: 'indices', component: IndexComponent },
  { path: '', redirectTo: '/stocks', pathMatch: 'full' }
];
