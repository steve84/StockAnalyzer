import { Routes } from '@angular/router';

import { AuthGuard } from './auth/authguard.service';

import { LoginComponent } from './login/login.component';
import { UserRegistrationComponent } from './userregistration/userregistration.component';
import { ImpressumComponent } from './content/impressum/impressum.component';
import { FrontpageComponent } from './content/frontpage/frontpage.component';
import { FaqComponent } from './content/faq/faq.component';
import { ContactComponent } from './content/contact/contact.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { PasswordChangeComponent } from './password/passwordchange/passwordchange.component';
import { PasswordResetComponent } from './password/passwordreset/passwordreset.component';
import { AccountComponent } from './account/account.component';

export const appRoutes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: UserRegistrationComponent},
  { path: 'frontpage', component: FrontpageComponent},
  { path: 'impressum', component: ImpressumComponent},
  { path: 'faq', component: FaqComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard]},
  { path: 'confirm/:userid/:token', component: ConfirmComponent},
  { path: 'password/change', component: PasswordChangeComponent, canActivate: [AuthGuard]},
  { path: 'password/reset', component: PasswordResetComponent},
  { path: 'stocks', loadChildren: 'app/stock/stock.module#StockModule', canActivate: [AuthGuard] },
  { path: '', redirectTo: '/frontpage', pathMatch: 'full' }
];
