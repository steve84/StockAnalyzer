import { Routes } from '@angular/router';

import { StockComponent } from './stock/stock.component';
import { IndexComponent } from './index/index.component';

export const stockRoutes: Routes = [
  { path: 'stocks', component: StockComponent },
  { path: 'indices', component: IndexComponent },
  { path: '', redirectTo: '/stocks', pathMatch: 'full' }
];
