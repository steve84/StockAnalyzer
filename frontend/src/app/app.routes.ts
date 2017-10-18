import { Routes } from '@angular/router';

import { AuthGuard } from './auth/authguard.service';

import { LoginComponent } from './login/login.component';
import { UserRegistrationComponent } from './userregistration/userregistration.component';

export const appRoutes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: UserRegistrationComponent},
  { path: 'stocks', loadChildren: 'app/stock/stock.module#StockModule', canActivate: [AuthGuard] },
  { path: '', redirectTo: '/stocks', pathMatch: 'full' }
];
