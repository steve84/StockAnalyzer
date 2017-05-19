import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { StockModule } from './stock/stock.module';

import { AppComponent } from './app.component';
import { StockComponent } from './stock/stock/stock.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    StockModule
  ],
  providers: [StockComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
