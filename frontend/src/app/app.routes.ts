import { Routes } from '@angular/router';

import { AuthGuard } from './auth/authguard.service';

import { LoginComponent } from './login/login.component';
import { UserRegistrationComponent } from './userregistration/userregistration.component';
import { ImpressumComponent } from './content/impressum/impressum.component';
import { FrontpageComponent } from './content/frontpage/frontpage.component';
import { ContactComponent } from './content/contact/contact.component';

export const appRoutes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: UserRegistrationComponent},
  { path: 'frontpage', component: FrontpageComponent},
  { path: 'impressum', component: ImpressumComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'stocks', loadChildren: 'app/stock/stock.module#StockModule', canActivate: [AuthGuard] },
  { path: '', redirectTo: '/frontpage', pathMatch: 'full' }
];
