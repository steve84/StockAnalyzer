import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { MenubarModule,
         DialogModule,
         ButtonModule,
         InputTextModule,
         CaptchaModule,
         MessagesModule,
         SplitButtonModule,
         DropdownModule,
         GrowlModule
       } from 'primeng/primeng';
       
import { StockModule } from './stock/stock.module';
import { AuthModule } from './auth/auth.module';

import { appRoutes } from './app.routes';

import { AppComponent } from './app.component';
import { StockTableComponent } from './stock/stocktable/stocktable.component';
import { StockquickfinderComponent } from './stock/stockquickfinder/stockquickfinder.component';
import { MenubarComponent } from './menubar/menubar.component';
import { LoginComponent } from './login/login.component';

import { UserService } from './user.service';
import { HelperService } from './helper.service';
import { MessageService } from './message.service';
import { AuthGuard } from './auth/authguard.service';
import { UserRegistrationComponent } from './userregistration/userregistration.component';
import { ImpressumComponent } from './content/impressum/impressum.component';
import { FrontpageComponent } from './content/frontpage/frontpage.component';
import { ContactComponent } from './content/contact/contact.component';
import { FooterbarComponent } from './footerbar/footerbar.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { PasswordChangeComponent } from './password/passwordchange/passwordchange.component';
import { PasswordResetComponent } from './password/passwordreset/passwordreset.component';
import { FaqComponent } from './content/faq/faq.component';

import { MessageTranslationPipe } from './stock/message_translation.pipe';
import { AccountComponent } from './account/account.component';
import { LanguageComponent } from './language/language.component';
import { StripeComponent } from './stripe/stripe.component';

@NgModule({
  declarations: [
    AppComponent,
    MenubarComponent,
    LoginComponent,
    UserRegistrationComponent,
    ImpressumComponent,
    FrontpageComponent,
    ContactComponent,
    FooterbarComponent,
    ConfirmComponent,
    FaqComponent,
    MessageTranslationPipe,
    AccountComponent,
    LanguageComponent,
    PasswordChangeComponent,
    PasswordResetComponent,
    StripeComponent
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
    MessagesModule,
    SplitButtonModule,
    DropdownModule,
    GrowlModule,
    StockModule,
    AuthModule
  ],
  providers: [
    StockTableComponent,
    StockquickfinderComponent,
    UserService,
    HelperService,
    MessageService,
    AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
