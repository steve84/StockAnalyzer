import { Routes } from '@angular/router';

import { StockComponent } from './stock/stock.component';

export const stockRoutes: Routes = [
  { path: 'stocks', component: StockComponent },
  { path: '', redirectTo: '/stocks', pathMatch: 'full' }
];
