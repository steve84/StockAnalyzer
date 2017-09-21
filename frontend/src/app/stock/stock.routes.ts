import { Routes } from '@angular/router';

import { AuthGuard } from '../auth/authguard.service';

import { StockTableComponent } from './stocktable/stocktable.component';
import { StocksearchComponent } from './stocksearch/stocksearch.component';
import { ScorecombinerComponent } from './scorecombiner/scorecombiner.component';
import { FundamentalComponent } from './fundamental/fundamental.component';
import { IndexComponent } from './index/index.component';

export const stockRoutes: Routes = [
  { path: 'stocks/search', component: StocksearchComponent, canActivate: [AuthGuard] },
  { path: 'stocks/:id', component: FundamentalComponent, canActivate: [AuthGuard] },
  { path: 'stocks', component: StockTableComponent, canActivate: [AuthGuard] },
  { path: 'combiner', component: ScorecombinerComponent, canActivate: [AuthGuard] },
  { path: 'indices', component: IndexComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/stocks', pathMatch: 'full', canActivate: [AuthGuard] }
];
