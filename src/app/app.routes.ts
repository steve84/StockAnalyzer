import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  { path: 'stocks', loadChildren: 'app/stock/stock.module#StockModule' },
  { path: '', redirectTo: '/stocks', pathMatch: 'full' }
];
