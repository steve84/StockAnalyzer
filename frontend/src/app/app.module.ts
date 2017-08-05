import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { MenubarModule } from 'primeng/primeng';

import { StockModule } from './stock/stock.module';

import { appRoutes } from './app.routes';

import { AppComponent } from './app.component';
import { StockTableComponent } from './stock/stocktable/stocktable.component';
import { StockquickfinderComponent } from './stock/stockquickfinder/stockquickfinder.component';
import { MenubarComponent } from './menubar/menubar.component';

@NgModule({
  declarations: [
    AppComponent,
    MenubarComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule,
    MenubarModule,
    StockModule
  ],
  providers: [StockTableComponent, StockquickfinderComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
