import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { MenubarModule, DialogModule, ButtonModule, InputTextModule, CaptchaModule } from 'primeng/primeng';

import { StockModule } from './stock/stock.module';
import { AuthModule } from './auth/auth.module';

import { appRoutes } from './app.routes';

import { AppComponent } from './app.component';
import { StockTableComponent } from './stock/stocktable/stocktable.component';
import { StockquickfinderComponent } from './stock/stockquickfinder/stockquickfinder.component';
import { MenubarComponent } from './menubar/menubar.component';
import { LoginComponent } from './login/login.component';

import { UserService } from './user.service';
import { AuthGuard } from './auth/authguard.service';
import { DialogSizeDirective } from './dialogsize.directive';
import { UserRegistrationComponent } from './userregistration/userregistration.component';

@NgModule({
  declarations: [
    AppComponent,
    MenubarComponent,
    LoginComponent,
    DialogSizeDirective,
    UserRegistrationComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MenubarModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    CaptchaModule,
    StockModule,
    AuthModule
  ],
  providers: [StockTableComponent, StockquickfinderComponent, UserService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
